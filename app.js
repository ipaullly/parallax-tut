let canvas = '',
  ctx= '',
  innerHeight= '',
  innerWidth= '',
  radius = 0.5,
  starsIndex = 0,
  stars = [],
  TWO_PI = Math.PI*2,
  centerY= '',
  centerX= '',
  focalLength = 400,
  starRadius= '',
  starX= '',
  starY= '',
  numStars = 1000;

window.onload = function () {
  canvas = document.getElementById('space_box');
  ctx = canvas.getContext('2d');

  innerWidth = window.innerWidth - 50,
  innerHeight = window.innerHeight - 50;
  
  centerX = innerWidth/2;
  centerY = innerHeight/2;

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // function for creating a new star
  function star(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.color= 'red';
    starsIndex++;
    stars[starsIndex] = this;
    this.id = starsIndex;

    //animate star
    this.update = function () {
      starX = (this.x - centerX) * (focalLength/this.z);
      starX += centerX;

      starY = (this.y - centerY) * (focalLength/this.z);
      starY += centerY;

      starRadius = radius * (focalLength/this.z);

      this.z += -10;

      if(this.z <= 0){
        this.z = parseInt(innerWidth);
      }

      this.draw();
    }

    // function to draw the star
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(starX, starY, starRadius, TWO_PI, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath(); 
    }
  }
  /// x, y and z values
  for (let s = 0; s < numStars; s++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let z = Math.random() * innerWidth;
    new star(x,y,z) 
  }
  // animating canvas objects
  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    for (let i in stars) {
      stars[i].update();
    }
  }

  animate()
}

// window.onload = function () {
//   function dist(p1, p2) {
//     let dx = p2.x - p1.x,
//       dy = p2.y - p1.y;
//     return Math.sqrt(dx * dx + dy * dy);
//   }

//   class Path {
//     constructor() {
//       this.coordinates = [
//       ];
//       this.distance = []; // [0, 1, 2] 
//       this.len = 0;
//     }
//     addPoint(x, y) {
//       this.coordinates.push({ x, y });
//       if (this.len === 0 && this.coordinates.length < 2) {
//         this.distance.push(0);
//       } else {
//         this.len += dist(...this.coordinates.slice(-2));
//         this.distance.push(this.len);
//       }
//     }
//     addPoints(xCords, yCords) {
//       let sortedCord;
//       for (let i = 0; i < xCords.length; i++) {
//         for (let j = 0; j < yCords.length; j++) {
//           if (i === j) {
//             sortedCord = {
//               x: xCords[i],
//               y: yCords[j]
//             }
//             this.coordinates.push(sortedCord);
//             if (this.len === 0 && this.coordinates.length < 2) {
//               this.distance.push(0);
//             } else {
//               this.len += dist(...this.coordinates.slice(-2));
//               this.distance.push(this.len);
//             }
//           }
//         }
//       }
      
//     }
//     get(t) {
//       // which two coordinates do we need to compute t?
//       let p1,
//         p2,
//         d1,
//         d2,
//         d = this.distance,
//         c = this.coordinates;
//       for (
//         let i = 0, e = d.length - 1;
//         i < e;
//         i++
//       ) {
//         d1 = d[i]; // 0
//         d2 = d[i + 1]; // 1
//         if (d1 <= t && t <= d2) {
//           p1 = c[i];
//           p2 = c[i + 1];
//           break;
//         }
//       }
//       t = (t - d1) / (d2 - d1);
//       let mt = 1 - t,
//         // get point
//         x = mt * p1.x + t * p2.x,
//         y = mt * p1.y + t * p2.y,
//         // get "unit derivative"
//         dx = p2.x - p1.x,
//         dy = p2.y - p1.y,
//         m = Math.sqrt(dx * dx + dy * dy),
//         nx,
//         ny;
//       dx /= m;
//       dy /= m;
//       // get (unit) normal;
//       nx = -dy;
//       ny = dx;
//       return {
//         p: { x: x, y: y },
//         d: { x: dx, y: dy },
//         n: { x: nx, y: ny },
//       };
//     }
//     getOffsetDistance(t) {
//       return 25 * Math.sin(t / 4);
//     }
//     draw(ctx) {
//       ctx.strokeStyle = "green";
//       ctx.beginPath();
//       // for (int i ; i < length; i++')
//       for (
//         let t = 0,
//           step = this.len / 400,
//           g,
//           p,
//           n,
//           f,
//           xStartPoint,
//           yStartPoint;
//         t < this.len;
//         t += step
//       ) {
//         g = this.get(t);
//         p = g.p;
//         n = g.n;
//         f = this.getOffsetDistance(t);
//         xStartPoint = p.x + f * n.x;
//         yStartPoint = p.y + f * n.y;
//         if (t === 0) {
//           ctx.moveTo(xStartPoint, yStartPoint);
//         } else {
//           // t = 1/2/3/4
//           ctx.lineTo(xStartPoint, yStartPoint);
//         }
//       }
//       ctx.stroke();

//       let c = this.coordinates; // [{x:300, y:300}]
//       // this.len = 9
//       ctx.strokeStyle = "black";
//       ctx.beginPath();
//       c.forEach((v, i) => {
//         if (i === 0){
//           ctx.moveTo(v.x, v.y);
//         } else {
//           ctx.lineTo(v.x, v.y);
//         }
//       });
//       ctx.stroke();
//     }
//     getCordinates(){
//       return this.coordinates
//     }
//   }

//   var c = document.querySelector("canvas");
//   var ctx = c.getContext("2d");
//   var p = new Path();
//   // p.addPoint(20, 40);
//   // p.addPoint(30, 50);
//   // p.addPoint(40, 60);
//   // p.addPoint(50, 70);
//   // p.addPoint(60, 30);
//   // p.addPoint(70, 20);
//   // p.addPoint(80, 90);
//   // p.addPoint(90, 120);
//   p.addPoints([400,300,440,500,570], [400,500,300,900,1200]);
//   p.draw(ctx);
//   console.log("this.cordinates", p.getCordinates());
// }