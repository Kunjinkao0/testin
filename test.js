<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Triangle Rays</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #fff;
        }

        .logo {
            width: 300px;
            height: 300px;
            background-color: #5A9B50;
            position: relative;
            border-radius: 50%;
            clip-path: circle(50% at 50% 50%);
        }

        #ray-container {
            margin: 10px;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            position: relative;
            transform: rotate(calc(360deg/16/2));
        }

        .ray {
            position: absolute;
            width: 100%;
            height: 50%;
            background-color: white;
            clip-path: polygon(50% 0, 45% 100%, 55% 100%);
            transform-origin: 50% 100%;
        }

        .ray:nth-child(1) {
            transform: rotate(0deg);
        }

        .ray:nth-child(2) {
            transform: rotate(22.5deg);
        }

        .ray:nth-child(3) {
            transform: rotate(45deg);
        }

        .ray:nth-child(4) {
            transform: rotate(67.5deg);
        }

        .ray:nth-child(5) {
            transform: rotate(90deg);
        }

        .ray:nth-child(6) {
            transform: rotate(112.5deg);
        }

        .ray:nth-child(7) {
            transform: rotate(135deg);
        }

        .ray:nth-child(8) {
            transform: rotate(157.5deg);
        }

        .ray:nth-child(9) {
            transform: rotate(180deg);
        }

        .ray:nth-child(10) {
            transform: rotate(202.5deg);
        }

        .ray:nth-child(11) {
            transform: rotate(225deg);
        }

        .ray:nth-child(12) {
            transform: rotate(247.5deg);
        }

        .ray:nth-child(13) {
            transform: rotate(270deg);
        }

        .ray:nth-child(14) {
            transform: rotate(292.5deg);
        }

        .ray:nth-child(15) {
            transform: rotate(315deg);
        }

        .ray:nth-child(16) {
            transform: rotate(337.5deg);
        }


        #trangle-back {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #5A9B50;
            clip-path: polygon(50% 0, 15% 100%, 85% 100%);
            transform: rotate(10deg);
            transform-origin: 50% 0;
            top: 35%;
        }

        #trangle-front {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: white;
            clip-path: polygon(50% 0, 15% 100%, 85% 100%);
            transform: rotate(-10deg);
            transform-origin: 50% 0;
            top: 35%;
        }

        #cut1 {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #5A9B50;
            clip-path: polygon(37% 23%, 58% 27%, 61.5% 31%, 39% 27%);
            z-index: 999;
            transform: rotate(-10deg);
            transform-origin: 50% 0;
            top: 35%;
        }

        #cut2 {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: white;
            clip-path: polygon(36% 16%, 40% 22.5%, 31% 17%);
            z-index: 999;
            transform: rotate(-10deg);
            transform-origin: 50% 0;
            top: 35%;
        }
    </style>
</head>

<body>
    <div class="logo">
        <div id="ray-container">
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
            <div class="ray"></div>
        </div>

        <div id="trangle-back"></div>
        <div id="trangle-front"></div>
        <div id="cut1"></div>
        <div id="cut2"></div>
    </div>
</body>

</html>