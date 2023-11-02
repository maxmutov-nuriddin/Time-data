import { useEffect, useRef } from 'react';

const HomePage = () => {
  const canvasRef = useRef(null);
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);
  const dropsRef = useRef([]);
  const dropColour = "#5C97BF";
  const dropLengths = [10, 12, 14, 16, 18, 20, 22];
  const dropSkews = [-2, -1, 0, 1, 2];
  const maxDrops = 500;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = widthRef.current;
    let height = heightRef.current;

    const Droplet = class {
      constructor(x, y, length, skew) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.skew = skew;
      }

      move() {
        this.y += this.length / 2;
        this.x += this.skew / 5;

        if (this.y > height) {
          this.y = 0;
        }
        if (this.x > width || this.x < 0) {
          this.y = 0;
          this.x = Math.floor(Math.random() * width);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.skew, this.y + this.length);
        ctx.strokeStyle = dropColour;
        ctx.stroke();
      }
    };

    const randVal = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let drop of dropsRef.current) {
        drop.move();
        drop.draw();
      }

      requestAnimationFrame(loop);
    };

    const createDrops = () => {
      for (let i = 0; i < maxDrops; i++) {
        const instance = new Droplet(
          Math.floor(Math.random() * width),
          Math.floor(Math.random() * height),
          randVal(dropLengths),
          randVal(dropSkews)
        );
        dropsRef.current.push(instance);
      }
    };

    createDrops();
    loop();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id='canvas' width="1604" height="576" ref={canvasRef} />;
};

export default HomePage;