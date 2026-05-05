import { 
    auth, db, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, doc, setDoc, serverTimestamp 
} from './main.js';

class KfluNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        const prefix = isIndex ? '' : 'index.html';

        this.innerHTML = `
            <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 py-4 px-6 text-white bg-transparent">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                    <div class="flex items-center gap-3 cursor-pointer" onclick="location.href='index.html'">
                        <img src="마크.jpg" alt="로고" class="h-10 w-10 object-contain bg-white rounded-full p-0.5">
                        <span class="font-extrabold text-xl md:text-2xl tracking-tight leading-tight">
                            한국노총 전국공공산업노동조합
                        </span>
                    </div>
                    <div class="hidden md:flex gap-8 font-medium items-center">
                        <a href="${prefix}#home" class="hover:text-blue-400 transition">홈</a>
                        <a href="${prefix}#message" class="hover:text-blue-400 transition">본부소개</a>
                        <a href="${prefix}#gallery" class="hover:text-blue-400 transition">활동현황</a>
                        <a href="board.html" class="hover:text-blue-400 transition">자유게시판</a>
                        <a href="${prefix}#contact" class="hover:text-blue-400 transition">오시는 길</a>
                        <a href="${prefix}#contact" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-bold transition">
                            상담신청
                        </a>

                        <div class="h-4 w-px bg-gray-400 mx-2 opacity-50"></div>
                        
                        <div id="auth-buttons" class="flex items-center gap-4">
                            <button onclick="openModal('login-modal')" class="hover:text-blue-400 transition">로그인</button>
                            <button onclick="openModal('register-modal')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition text-sm">회원가입</button>
                        </div>
                        
                        <div id="user-info-nav" class="hidden flex items-center gap-4">
                            <span id="nav-user-name" class="text-sm font-bold"></span>
                            <button id="logout-btn" class="text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded transition">로그아웃</button>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        this.initScrollEffect();
        this.initAuthObserver();
    }

    initScrollEffect() {
        const nav = this.querySelector('#navbar');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                nav.classList.add('bg-white', 'shadow-md', 'text-gray-900');
                nav.classList.remove('bg-transparent', 'text-white');
            } else {
                nav.classList.add('bg-transparent', 'text-white');
                nav.classList.remove('bg-white', 'shadow-md', 'text-gray-900');
            }
        });
    }

    initAuthObserver() {
        const authButtons = this.querySelector('#auth-buttons');
        const userInfoNav = this.querySelector('#user-info-nav');
        const navUserName = this.querySelector('#nav-user-name');
        const logoutBtn = this.querySelector('#logout-btn');

        onAuthStateChanged(auth, (user) => {
            if (user) {
                authButtons.classList.add('hidden');
                userInfoNav.classList.remove('hidden');
                const displayName = user.displayName || user.email.split('@')[0];
                navUserName.textContent = displayName + '님';
            } else {
                authButtons.classList.remove('hidden');
                userInfoNav.classList.add('hidden');
            }
        });

        if (logoutBtn) {
            logoutBtn.onclick = () => {
                signOut(auth).then(() => {
                    alert('로그아웃 되었습니다.');
                    location.reload();
                });
            };
        }
    }
}

class KfluAuthModals extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="login-modal" class="fixed inset-0 z-[100] hidden overflow-y-auto" aria-labelledby="login-modal-title" role="dialog" aria-modal="true">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" onclick="closeModal('login-modal')"></div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                                    <div class="flex justify-between items-center mb-6">
                                        <h3 class="text-2xl font-bold leading-6 text-gray-900" id="login-modal-title">로그인</h3>
                                        <button onclick="closeModal('login-modal')" class="text-gray-400 hover:text-gray-600">
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <form id="login-form-comp" class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">아이디 (이메일)</label>
                                            <input type="email" id="login-email-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="example@email.com">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">비밀번호</label>
                                            <input type="password" id="login-password-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="••••••••">
                                        </div>
                                        <button type="submit" class="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">로그인</button>
                                    </form>
                                    <div class="mt-6 text-center text-sm text-gray-500">
                                        계정이 없으신가요? <button onclick="closeModal('login-modal'); openModal('register-modal')" class="text-blue-600 font-bold hover:underline">회원가입</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="register-modal" class="fixed inset-0 z-[100] hidden overflow-y-auto" aria-labelledby="register-modal-title" role="dialog" aria-modal="true">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true" onclick="closeModal('register-modal')"></div>
                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="w-full mt-3 text-center sm:mt-0 sm:text-left">
                                    <div class="flex justify-between items-center mb-6">
                                        <h3 class="text-2xl font-bold leading-6 text-gray-900" id="register-modal-title">회원가입</h3>
                                        <button onclick="closeModal('register-modal')" class="text-gray-400 hover:text-gray-600">
                                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <form id="register-form-comp" class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">이름</label>
                                            <input type="text" id="reg-name-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="홍길동">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">아이디 (이메일)</label>
                                            <input type="email" id="reg-email-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="example@email.com">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">연락처</label>
                                            <input type="tel" id="reg-phone-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="010-0000-0000">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">비밀번호</label>
                                            <input type="password" id="reg-password-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="8자 이상 입력하세요">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-bold text-gray-700 mb-1">비밀번호 확인</label>
                                            <input type="password" id="reg-confirm-comp" required class="w-full px-4 py-2 border rounded-md focus:outline-blue-500" placeholder="비밀번호를 다시 입력하세요">
                                        </div>
                                        <button type="submit" class="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">가입하기</button>
                                    </form>
                                    <div class="mt-6 text-center text-sm text-gray-500">
                                        이미 계정이 있으신가요? <button onclick="closeModal('register-modal'); openModal('login-modal')" class="text-blue-600 font-bold hover:underline">로그인</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.initAuthLogic();
    }

    initAuthLogic() {
        const loginForm = this.querySelector('#login-form-comp');
        const registerForm = this.querySelector('#register-form-comp');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = this.querySelector('#login-email-comp').value;
                const password = this.querySelector('#login-password-comp').value;

                signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        alert('로그인에 성공했습니다!');
                        closeModal('login-modal');
                        location.reload();
                    })
                    .catch((error) => {
                        alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
                    });
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = this.querySelector('#reg-name-comp').value;
                const email = this.querySelector('#reg-email-comp').value;
                const phone = this.querySelector('#reg-phone-comp').value;
                const password = this.querySelector('#reg-password-comp').value;
                const confirm = this.querySelector('#reg-confirm-comp').value;

                if (password !== confirm) {
                    alert('비밀번호가 일치하지 않습니다.');
                    return;
                }

                const submitBtn = e.target.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = '가입 처리 중...';

                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    
                    // 프로필 업데이트
                    await updateProfile(user, { displayName: name });
                    
                    // 관리자 이메일 체크 (대소문자 무시)
                    const isAdminEmail = email.toLowerCase().trim() === 'admin@admin.com';
                    
                    // Firestore에 사용자 정보 저장
                    await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        name: name,
                        email: email,
                        phone: phone,
                        role: isAdminEmail ? 'admin' : 'member',
                        joinedAt: serverTimestamp()
                    });

                    alert('회원가입이 완료되었습니다!');
                    closeModal('register-modal');
                    location.reload();
                } catch (error) {
                    console.error("Registration error:", error);
                    let message = '회원가입 실패: ';
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            message += '이미 가입된 이메일입니다.';
                            break;
                        case 'auth/weak-password':
                            message += '비밀번호가 너무 취약합니다.';
                            break;
                        case 'permission-denied':
                            message += '데이터 저장 권한이 없습니다. (Firestore 규칙 확인 필요)';
                            break;
                        default:
                            message += error.message;
                    }
                    alert(message);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '가입하기';
                }
            });
        }
    }
}

window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('[role="dialog"]').forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                closeModal(modal.id);
            }
        });
    }
});

class KfluFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-900 text-gray-400 py-12 px-6 border-t border-gray-800">
                <div class="max-w-7xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h3 class="text-white font-bold text-xl mb-4">전국공공산업노동조합 건설산업분과 경기남부본부</h3>
                        <p class="text-sm">Copyright © 2024 Federation of Korean Public Trade Unions. All Rights Reserved.</p>
                    </div>
                    <div class="flex gap-6">
                        <a href="#" class="hover:text-white transition text-sm">개인정보처리방침</a>
                        <a href="#" class="hover:text-white transition text-sm">이용약관</a>
                        <a href="admin.html" class="hover:text-white transition text-sm">관리자</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('kflu-navbar', KfluNavbar);
customElements.define('kflu-auth-modals', KfluAuthModals);
customElements.define('kflu-footer', KfluFooter);