"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const AnimatedWords = ({ fontColor }) => {
    const [animatedWordText_one, setAnimatedWordText_one] = useState('');
    const [animatedWordText_two, setAnimatedWordText_two] = useState('');
    const [animationStarted, setAnimationStarted] = useState(false);
    const animatedWord_one = useRef();
    const animatedWord_two = useRef();
  
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
      <div className={'relative block tablet:w-auto mb-2 text-orange headline-shadow font-bold max-[500px]:text-4xl text-5xl mobile:text-6xl tablet:text-7xl desktop:text-7xl'}>
        
        <Image 
          src='/assets/svg/bidstacker-splash000.svg'
          alt="Bidstacker early access"
          width={220}
          height={240}
          className="absolute -right-6 mobile:right-0 -translate-y-3/4 top-0 w-[120px] mobile:w-[220px] desktop:w-[280px]"
        />
        
        EN&nbsp;
        <span className="animated_morphing_words_container text-white">
          <span ref={animatedWord_one}>{animatedWordText_one}</span>
          <span ref={animatedWord_two}>{animatedWordText_two}</span>
        </span>
        <br />
        MATERIALHANDEL
      </div>
    </>)
}

export default AnimatedWords;