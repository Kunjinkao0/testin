document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('chartCanvas');
    const ctx = canvas.getContext('2d');

    let xValues = ['a', 'b', 'c', 'd', 'e', 'f'];
    let yValues = [1, 2, 3, 4, 5, 6];
    let chartType = 'bar'; // 初始图表类型
    let zoomLevel = 1; // 缩放级别，默认为1表示原始大小
    let title = ''; // 图表标题
    let tooltip = document.getElementById('tooltip');
    let hoveredIndex = -1; // 当前悬停的索引
    let yAxisRange = { min: 0, max: 50 };

    const chartWidth = canvas.width;
    const chartHeight = canvas.height;
    const yAxisStart = 50;
    const xAxisStart = chartHeight - 50;
    const barWidth = 30;
    const barPadding = 10;

    // 更新按钮文本以反映当前图表类型
    function updateButtonType() {
        const button = document.getElementById('chartTypeButton');
        button.textContent = `Current Chart Type: ${chartType}`;
        redrawChart()
    }

    // 添加按钮点击事件
    document.getElementById('chartTypeButton').addEventListener('click', function() {
        chartType = chartType === 'bar' ? 'line' : 'bar';
        updateButtonType();
    });

    // 定义重绘函数
function redrawChart() {
    drawChart(xValues, yValues, title, yAxisRange);
}

    // 添加滚动条改变事件
    document.getElementById('zoomSlider').addEventListener('input', function() {
        zoomLevel = parseFloat(this.value);
        redrawChart()
    });

    // 添加绘制按钮点击事件
    document.getElementById('drawButton').addEventListener('click', function() {
        try {
            let xInput = document.getElementById('xLabelInput').value;
            let yInput = document.getElementById('yLabelInput').value;
            title = document.getElementById('titleLabel').value;

            let newXValues = parseCommaSeparatedValues(xInput);
            let newYValues = parseCommaSeparatedValues(yInput);

            if (!newXValues || !newYValues) {
                throw new Error("Please enter values in the correct comma-separated format (e.g., a,b,c,d,e,f or 1,2,3,4,5,6).");
            }

            xValues = newXValues;
            yValues = newYValues;

            // 计算Y值的最大值和最小值
            let yMin = Math.min(...yValues) - 1;
            let yMax = Math.max(...yValues);

            // 设置Y轴范围
            yAxisRange = { min: yMin, max: yMax };

            drawChart(xValues, yValues, title, yAxisRange);
        } catch (e) {
            alert(e.message);
        }
    });

    function parseCommaSeparatedValues(input) {
        // 使用正则表达式验证输入是否符合逗号分隔的
        const regex = /^\s*([\w\s]+)\s*(,\s*[\w\s]+)*$/;
        if (!regex.test(input)) {
            return null;
        }

        // 如果格式正确，使用split方法按逗号分割字符串，并去除每个元素两边的空格
        return input.split(',').map(item => item.trim());
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawChart(xValues, yValues, title, yAxisRange) {
        const canvas = document.getElementById('chartCanvas');
        const ctx = canvas.getContext('2d');
        const chartWidth = canvas.width;
        const chartHeight = canvas.height;
        const yAxisStart = 50;
        const xAxisStart = chartHeight - 50;
        const barWidth = 30;
        const barPadding = 10;
        const zoomLevel = 1; // 可以根据需要调整缩放级别
    
        ctx.clearRect(0, 0, chartWidth, chartHeight);
    
        // 绘制标题
        ctx.fillText(title, chartWidth / 2 - ctx.measureText(title).width / 2, 20);
    
        // 绘制X轴
        ctx.beginPath();
        ctx.moveTo(yAxisStart, xAxisStart);
        ctx.lineTo(chartWidth - 50, xAxisStart);
        ctx.stroke();
    
        // 绘制Y轴
        ctx.beginPath();
        ctx.moveTo(yAxisStart, xAxisStart);
        ctx.lineTo(yAxisStart, 50);
        ctx.stroke();
    
        // 绘制数据标签
        xValues.forEach((label, index) => {
            ctx.fillText(label, yAxisStart + index * (barWidth + barPadding) * zoomLevel + barWidth / 2, chartHeight - 20);
        });
    
        // 计算Y轴的刻度间隔
        const yMin = Math.ceil(yAxisRange.min);
        const yMax = Math.floor(yAxisRange.max);
        const numTicks = 10; // 刻度数量
        const tickStep = Math.ceil((yMax - yMin) / numTicks); // 每个刻度的步长
    
        // 绘制Y轴刻度
        for (let i = 0; i <= numTicks; i++) {
            const tickValue = yMin + i * tickStep;
            const tickPosition = xAxisStart - (tickValue - yMin) * (xAxisStart / (yMax - yMin));
            ctx.beginPath();
            ctx.moveTo(yAxisStart - 5, tickPosition);
            ctx.lineTo(yAxisStart + 5, tickPosition);
            ctx.stroke();
            
            // 在Y轴上显示刻度值
            ctx.fillText(tickValue.toString(), yAxisStart - 30, tickPosition + 5);
        }
    
        // 添加mousemove事件监听器
        let hoveredIndex = -1;
        canvas.addEventListener('mousemove', function(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
    
            // 寻找鼠标悬停的柱子
            hoveredIndex = -1;
            for (let i = 0; i < xValues.length; i++) {
                const barX = yAxisStart + i * (barWidth + barPadding) * zoomLevel;
                const barY = xAxisStart - (yValues[i] - yMin) * (xAxisStart / (yMax - yMin));
                const barHeight = (yValues[i] - yMin) * (xAxisStart / (yMax - yMin));
    
                if (mouseX >= barX && mouseX <= barX + barWidth * zoomLevel &&
                    mouseY >= barY && mouseY <= barY + barHeight) {
                    hoveredIndex = i;
                    break;
                }
            }
    
            // 更新tooltip显示状态
            if (hoveredIndex > -1) {
                tooltip.style.left = (event.clientX + 10) + 'px';
                tooltip.style.top = (event.clientY + 10) + 'px';
                tooltip.innerHTML = `${xValues[hoveredIndex]}: ${yValues[hoveredIndex]}`;
                tooltip.style.display = 'block';
            } else {
                tooltip.style.display = 'none';
            }
        });
    
        // 添加mouseout事件监听器
        canvas.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
            hoveredIndex = -1;
        });
    
        // 绘制图表
        if (chartType === 'bar') {
            // 绘制柱状图
            for (let i = 0; i < xValues.length; i++) {
                const barX = yAxisStart + i * (barWidth + barPadding) * zoomLevel;
                const barY = xAxisStart - (yValues[i] - yMin) * (xAxisStart / (yMax - yMin));
                ctx.fillStyle = hoveredIndex === i ? 'red' : getRandomColor(); // 随机颜色
                ctx.fillRect(barX, barY, barWidth * zoomLevel, (yValues[i] - yMin) * (xAxisStart / (yMax - yMin)));
                ctx.strokeRect(barX, barY, barWidth * zoomLevel, (yValues[i] - yMin) * (xAxisStart / (yMax - yMin)));
            }
        } else if (chartType === 'line') {
            // 绘制线性图
            ctx.beginPath();
            ctx.moveTo(yAxisStart + (barWidth + barPadding) * zoomLevel / 2, xAxisStart - (yValues[0] - yMin) * (xAxisStart / (yMax - yMin)));
            for (let i = 1; i < xValues.length; i++) {
                const pointX = yAxisStart + (i * (barWidth + barPadding) + barWidth / 2) * zoomLevel;
                const pointY = xAxisStart - (yValues[i] - yMin) * (xAxisStart / (yMax - yMin));
                ctx.lineTo(pointX, pointY);
            }
            ctx.strokeStyle = 'black';
            ctx.stroke();
    
            // 高亮显示悬停的点
            if (hoveredIndex !== -1) {
                const pointX = yAxisStart + (hoveredIndex * (barWidth + barPadding) + barWidth / 2) * zoomLevel;
                const pointY = xAxisStart - (yValues[hoveredIndex] - yMin) * (xAxisStart / (yMax - yMin));
                ctx.beginPath();
                ctx.arc(pointX, pointY, 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();
            }
    
            // 在每个交点绘制一个圆圈
            for (let i = 0; i < xValues.length; i++) {
                const pointX = yAxisStart + (i * (barWidth + barPadding) + barWidth / 2) * zoomLevel;
                const pointY = xAxisStart - (yValues[i] - yMin) * (xAxisStart / (yMax - yMin));
                ctx.beginPath();
                ctx.arc(pointX, pointY, 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'blue'; // 圆圈的颜色
                ctx.fill();
            }
        }
    }
});