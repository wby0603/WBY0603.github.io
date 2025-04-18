document.addEventListener('DOMContentLoaded', function() {
    // 预加载处理
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('preloader').style.opacity = '0';
            document.getElementById('preloader').style.visibility = 'hidden';
        }, 500);
    });

    // 移动菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动菜单
                mobileMenu.classList.add('hidden');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 返回顶部按钮
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 滚动时激活导航链接
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-600');
            }
        });
    });

    // 懒加载图片
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }

    // 性能优化 - 延迟非关键资源加载
    window.setTimeout(function() {
        const nonCriticalElements = document.querySelectorAll('[data-src]');
        nonCriticalElements.forEach(el => {
            el.src = el.dataset.src;
        });
    }, 2000);
});