Mever - Personal Portfolio
A personal portfolio website that I created both as a school project and as a real business card.
At first everything was in HTML/CSS/Js, then I rewrited using React. And it took a lot of time.
Site has translation to 2 languages, and User can switch to dark mode or light mode.

Structure of the project:

src/
├── components/
│   ├── Navbar.jsx        
│   ├── Hero.jsx          
│   ├── About.jsx         
│   ├── Skills.jsx        
│   ├── Projects.jsx      
│   ├── Contact.jsx       
│   ├── Footer.jsx
│   └── MatrixCanvas.jsx  
├── context/
│   └── ThemeContext.jsx  
├── data/
│   ├── translations.js   
│   ├── projects.js       
│   └── skills.js         
├── App.jsx
├── main.jsx
└── index.css

If u wanna run locally, do this:

git clone https://github.com/7teenmever/my-website.git
cd my-website
npm install
npm run dev


Also I got contact form. 
All forms submitted through the website come to my formspree account.

So let's be honest. How I did it.
The project went through several stages. I started from scratch—a simple HTML file with CSS. Then I added JS, then migrated to React + Vite, and figured out the Context API, hooks, and react-hook-form. I googled a lot of documentation, watched tutorials, and used an AI assistant (OpenAI Codex) to help me write and refactor code—especially when migrating to React.