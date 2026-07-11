const words = [
    "Freelancer.",
    "Developer.",
    "Designer.",
    "Programmer.",
    "UI/UX Designer.",
    "Web Developer.",
    "Photographer.",
    "& Many More."
];

const typing = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typing.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200); // পুরো শব্দ দেখানোর পর ১.২ সেকেন্ড অপেক্ষা
            return;
        }

    } else {

        typing.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }

    }

    setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();



// Customer feedback 





document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.feedback-slider .swiper-wrapper');
    const cards = document.querySelectorAll('.review-card');

    if (wrapper && cards.length > 0) {
        // ১. সিএসএস পরিবর্তন না করেই জাভাস্ক্রিপ্ট দিয়ে গ্রিড ভেঙে এক লাইনে আনা
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'row';
        wrapper.style.overflowX = 'auto';
        wrapper.style.scrollBehavior = 'smooth';
        wrapper.style.cursor = 'grab';

        // স্ক্রলবার লুকিয়ে ফেলার জন্য কাস্টম স্টাইল যোগ করা
        wrapper.style.scrollbarWidth = 'none'; // Firefox
        const style = document.createElement('style');
        style.textContent = `.feedback-slider .swiper-wrapper::-webkit-scrollbar { display: none; }`;
        document.head.append(style);

        // ২. প্রতিটি কার্ডের উইডথ ফিক্সড করা যেন শুরুতে ঠিক ৪টি কার্ডই দেখায় (গ্যাপসহ)
        cards.forEach(card => {
            card.style.flex = '0 0 calc(25% - 18px)'; // ৪টি কার্ড পারফেক্ট দেখানোর হিসাব
            card.style.minWidth = 'calc(25% - 18px)';
        });

        // ৩. রেসপনসিভ হ্যান্ডেল করা (ছোট স্ক্রিনে কার্ডের সাইজ ঠিক করা)
        function handleResponsive() {
            const width = window.innerWidth;
            cards.forEach(card => {
                if (width <= 640) {
                    card.style.flex = '0 0 100%'; // মোবাইলে ১টি
                    card.style.minWidth = '100%';
                } else if (width <= 1024) {
                    card.style.flex = '0 0 calc(50% - 12px)'; // ট্যাবে ২টি
                    card.style.minWidth = 'calc(50% - 12px)';
                } else {
                    card.style.flex = '0 0 calc(25% - 18px)'; // ডেক্সটপে ৪টি
                    card.style.minWidth = 'calc(25% - 18px)';
                }
            });
        }
        window.addEventListener('resize', handleResponsive);
        handleResponsive(); // প্রথমে একবার রান করা

        // ৪. মাউস দিয়ে টেনে (Drag) ডান-বামে স্লাইড করার লজিক
        let isDown = false;
        let startX;
        let scrollLeft;

        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            wrapper.style.scrollBehavior = 'auto';
            wrapper.style.cursor = 'grabbing';
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });

        wrapper.addEventListener('mouseleave', () => {
            isDown = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('mouseup', () => {
            isDown = false;
            wrapper.style.cursor = 'grab';
            wrapper.style.scrollBehavior = 'smooth';
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1.5; // স্লাইডিং স্পিড
            wrapper.scrollLeft = scrollLeft - walk;
        });
    }
});








// বাটন তৈরি


document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector('.feedback-slider .swiper-wrapper');
    const cards = document.querySelectorAll('.review-card');
    const dotButtons = document.querySelectorAll('.dot-btn');

    if (wrapper && cards.length > 0) {
        // ১. বেসিক স্ক্রল সেটিংস
        wrapper.style.overflowX = 'auto';
        wrapper.style.scrollBehavior = 'smooth';
        wrapper.style.cursor = 'grab';

        // স্ক্রলবার লুকিয়ে ফেলা
        wrapper.style.scrollbarWidth = 'none'; 
        const style = document.createElement('style');
        style.textContent = `.feedback-slider .swiper-wrapper::-webkit-scrollbar { display: none; }`;
        document.head.append(style);

        // ২. ডট বাটন একটিভ করার ফাংশন
        function updateDots() {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = 24; 
            const totalStepWidth = cardWidth + gap;
            
            const currentIndex = Math.round(wrapper.scrollLeft / totalStepWidth);
            
            dotButtons.forEach((btn, index) => {
                if (index === currentIndex) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // ৩. মাউস দিয়ে টেনে (Drag) স্লাইড করার লজিক
        let isDown = false;
        let startX;
        let scrollLeft;

        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            wrapper.style.scrollBehavior = 'auto'; 
            wrapper.style.cursor = 'grabbing';
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
        });

        wrapper.addEventListener('mouseleave', () => {
            if (isDown) {
                wrapper.style.scrollBehavior = 'smooth';
                snapToNearestCard();
            }
            isDown = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('mouseup', () => {
            isDown = false;
            wrapper.style.cursor = 'grab';
            wrapper.style.scrollBehavior = 'smooth';
            snapToNearestCard(); 
        });

        wrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1.3; 
            wrapper.style.scrollLeft = scrollLeft - walk;
            updateDots(); 
        });

        // ৪. মাউস ছাড়ার পর কার্ড স্ন্যাপ (Snap) করানো
        function snapToNearestCard() {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = 24;
            const totalStepWidth = cardWidth + gap;
            const currentIndex = Math.round(wrapper.scrollLeft / totalStepWidth);
            
            wrapper.scrollLeft = currentIndex * totalStepWidth;
            updateDots();
        }

        // ৫. বাটন ক্লিকের মাধ্যমে স্লাইড করা
        dotButtons.forEach(button => {
            button.addEventListener('click', () => {
                wrapper.style.scrollBehavior = 'smooth';
                
                const targetIndex = parseInt(button.getAttribute('data-index'));
                const cardWidth = cards[0].getBoundingClientRect().width;
                const gap = 24;
                
                const scrollAmount = targetIndex * (cardWidth + gap);
                wrapper.scrollLeft = scrollAmount;
                
                dotButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        wrapper.addEventListener('scroll', updateDots);
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            const currentItem = this.parentElement; // বর্তমান faq-item
            const currentAnswer = currentItem.querySelector('.faq-answer'); // বর্তমান উত্তর
            
            // চেক করছি বর্তমান ক্লিক করা আইটেমটি আগেই খোলা আছে কিনা
            const isOpen = currentItem.classList.contains('open');

            // ১. প্রথমে অন্য সব খোলা FAQ আইটেম বন্ধ করে দেওয়া হচ্ছে
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.display = 'none'; // অন্য সব উত্তর হাইড করা
                }
            });
            
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.classList.remove('active');
            });

            // ২. যদি প্রশ্নটি আগে থেকে খোলা না থাকে, তবেই এটিকে খোলা হবে
            if (!isOpen) {
                currentItem.classList.add('open');
                this.classList.add('active');
                if (currentAnswer) {
                    currentAnswer.style.display = 'block'; // উত্তরটি দৃশ্যমান করা
                }
            }
        });
    });
});
















































