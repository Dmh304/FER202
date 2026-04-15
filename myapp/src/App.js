import './App.css';
import React from 'react';
import './App.css';

function App() {
  return (
    <>
    <Navbar />
    <CourseList />
    <Footer />
    </>
  );
}

const Navbar = () => {
  return (
    <nav className='Navbar'>
    <span className='navBrand'>
      MyApp
    </span>
    <ul className='nav-links'>
      <li><a href='/'>Home</a></li>
      <li><a href='/course'>Course</a></li>
      <li><a href='/'>About</a></li>
      <li><a href='/'>Contact</a></li>
    </ul>

    <div className='access'>
      <button className='btn login'>Login</button>
      <button className='btn signup'>Sign Up</button>
    </div>

  </nav>
  );
}

const CourseList = () => {
  const courses = [
    { id: 1, title: 'JSX & Components', tag: 'React' },
    { id: 2, title: 'Arrow & Destructuring', tag: 'ES6' },
    { id: 3, title: 'Version Control', tag: 'Git' },
  ];
  return (
    <div className="course-grid">
      {courses.map(c => (
        <div key={c.id} className="course-card">
          <span>{c.tag}</span>
          <h3>{c.title}</h3>
        </div>
      ))}
    </div>
  );
}

const Footer = () => { 
  return (
    <footer className='footer'>
      <span className='author'>Authorized by Dong Manh Hung</span>
      <p className='FPT'>FPT University</p>
    </footer>
  );
}

export default App;