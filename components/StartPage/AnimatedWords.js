"use client";
import { useState, useRef, useEffect } from 'react';

const AnimatedWords = ({ fontColor }) => {
    const [animatedWordText_one, setAnimatedWordText_one] = useState('');
    const [animatedWordText_two, setAnimatedWordText_two] = useState('');
  
    const animatedWord_one = useRef();
    const animatedWord_two = useRef();
    const [animationStarted, setAnimationStarted] = useState(false);
  
    useEffect(() => {
       
      // setAnimationStarted(true);
  
      var animationFrameHandle;
  
      const elts = {
        text1: animatedWord_one.current,
        text2: animatedWord_two.current
      };
      
      const texts = [
          "LÖNSAM",
          "EFFEKTIV",
          "HÅLLBAR"
      ];
      
      const morphTime = 1;
      const cooldownTime = 2;
      
      let textIndex = texts.length - 1;
      let time = new Date();
      let morph = 0;
      let cooldown = cooldownTime;
      
      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      
      function doMorph() {
          morph -= cooldown;
          cooldown = 0;
      
          let fraction = morph / morphTime;
      
          if (fraction > 1) {
              cooldown = cooldownTime;
              fraction = 1;
          }
      
          setMorph(fraction);
      }
      
      function setMorph(fraction) {
          elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
          fraction = 1 - fraction;
          elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
          elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      
          elts.text1.textContent = texts[textIndex % texts.length];
          elts.text2.textContent = texts[(textIndex + 1) % texts.length];
      }
      
      function doCooldown() {
          morph = 0;
      
          elts.text2.style.filter = "";
          elts.text2.style.opacity = "100%";
      
          elts.text1.style.filter = "";
          elts.text1.style.opacity = "0%";
      }
      
      function animate() {
        animationFrameHandle = requestAnimationFrame(animate);
      
          let newTime = new Date();
          let shouldIncrementIndex = cooldown > 0;
          let dt = (newTime - time) / 1000;
          time = newTime;
      
          cooldown -= dt;
      
          if (cooldown <= 0) {
              if (shouldIncrementIndex) {
                  textIndex++;
              }
      
              doMorph();
          } else {
              doCooldown();
          }
      }
      
      animate();
  
    
  
    return () => {
      window.cancelAnimationFrame(animationFrameHandle)
    }
  
  },[animatedWord_one, animatedWord_two])
  
    return (<>
      <div className={fontColor ? 'mb-2 text-orange headline-shadow pl-6 flex flex-row flex-wrap text-3xl font-bold tablet:text-5xl desktop:text-7xl' : 'text-3xl font-bold tablet:text-5xl desktop:text-7xl headline-shadow mb-2 pl-6 flex flex-row flex-wrap'}>
        EN&nbsp;
        
        <span className="animated_morphing_words_container text-[#76A37A]">
          <span ref={animatedWord_one}>{animatedWordText_one}</span>
          <span ref={animatedWord_two}>{animatedWordText_two}</span>
        </span>
  
        <span>&nbsp;</span>
        MATERIALHANDEL
      </div>
    </>)
}

export default AnimatedWords;