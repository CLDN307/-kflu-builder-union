
import { auth, onAuthStateChanged, signOut } from './main.js';

class KfluNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
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
                        <a href="${prefix}#about" class="hover:text-blue-400 transition">본부소개</a>
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
                navUserName.textContent = (user.displayName || '회원') + '님';
            } else {
                authButtons.classList.remove('hidden');
                userInfoNav.classList.add('hidden');
            }
        });

        logoutBtn.onclick = () => {
            signOut(auth).then(() => {
                alert('로그아웃 되었습니다.');
                location.reload();
            });
        };
    }
}

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
customElements.define('kflu-footer', KfluFooter);
