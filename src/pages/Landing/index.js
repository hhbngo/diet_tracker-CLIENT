import React from 'react';
import { Link } from 'react-router-dom';
import classes from './index.module.css';

const Landing = () => {
  return (
    <div>
      <div className={classes.hero}>
        <div className={classes.content}>
          <div className={classes.hero_about}>
            <h1>Simple and Clean Diet Logger</h1>
            <p>
              A web app to track daily diet. Record, calculate, and analyze
              macronutrients of each meal.
            </p>
            <p>
              <span>100% completely free!</span>
            </p>
            <Link to="/register">
              <button>Register Now</button>{' '}
            </Link>
          </div>
          <img
            src="https://i.imgur.com/C09Wk8x.png"
            alt="mockup"
            className={classes.hero_mockup}
          />
        </div>
        <svg className={classes.waves} viewBox="0 0 1440 320">
          <path
            fill="rgb(246, 248, 251)"
            fillOpacity="1"
            d="M0,32L30,69.3C60,107,120,181,180,224C240,267,300,277,360,272C420,267,480,245,540,213.3C600,181,660,139,720,128C780,117,840,139,900,133.3C960,128,1020,96,1080,117.3C1140,139,1200,213,1260,245.3C1320,277,1380,267,1410,261.3L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Landing;
