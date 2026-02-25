document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    if(localStorage.getItem('theme') === 'dark'){
        body.classList.add('dark-theme');
    }

    if(toggleBtn){
        toggleBtn.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            toggleBtn.textContent = isDark ? '☀️' : '🌙';
        });
    }

    const form = document.getElementById('contact-form');
    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if(name===""){ alert("Please enter your name"); return; }
            if(!email.includes("@")){ alert("Please enter a valid email"); return; }
            if(message.length<10){ alert("Message must be at least 10 characters"); return; }

            alert("Message sent successfully!");
            form.reset();
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener('click', e=>{
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth'});
        });
    });
});
