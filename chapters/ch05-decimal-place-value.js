window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'Decimal Place Value',
    subtitle: 'Meet the dot that unlocks a whole new world of numbers!',
    sections: [
        // ============================================================
        // SECTION 1: Place Value System
        // ============================================================
        {
            id: 'ch05-sec01',
            title: 'Place Value System',
            content: `
                <h2>Place Value System</h2>

                <div class="env-block intuition">
                    <div class="env-title">Beyond Whole Numbers</div>
                    <div class="env-body">
                        <p>You already know that in the number 352, the 3 means 3 hundreds, the 5 means 5 tens, and the 2 means 2 ones. But what about numbers between the whole numbers, like the price $3.52? That little dot (the <strong>decimal point</strong>) opens up a whole new world of place values to the right!</p>
                    </div>
                </div>

                <h3>Extending the Pattern</h3>

                <p>Look at the pattern in place values. As you move left, each place is <strong>10 times bigger</strong>. As you move right, each place is <strong>10 times smaller</strong>:</p>

                <ul>
                    <li>Hundreds (100) &rarr; Tens (10) &rarr; Ones (1) &rarr; <strong>.</strong> &rarr; Tenths (0.1) &rarr; Hundredths (0.01) &rarr; Thousandths (0.001)</li>
                </ul>

                <p>The decimal point sits between the ones place and the tenths place, like a fence between whole numbers and parts of numbers.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>In the number \\(4.729\\):</p>
                        <ul>
                            <li>\\(4\\) is in the <strong>ones</strong> place &rarr; worth \\(4\\)</li>
                            <li>\\(7\\) is in the <strong>tenths</strong> place &rarr; worth \\(0.7\\)</li>
                            <li>\\(2\\) is in the <strong>hundredths</strong> place &rarr; worth \\(0.02\\)</li>
                            <li>\\(9\\) is in the <strong>thousandths</strong> place &rarr; worth \\(0.009\\)</li>
                        </ul>
                        <p>Total: \\(4 + 0.7 + 0.02 + 0.009 = 4.729\\)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-place-chart"></div>

                <div class="env-block remark">
                    <div class="env-title">The -ths Naming Pattern</div>
                    <div class="env-body">
                        <p>Notice the naming trick: <strong>ten</strong>s and <strong>ten</strong>ths are mirrors, <strong>hundred</strong>s and <strong>hundred</strong>ths are mirrors, <strong>thousand</strong>s and <strong>thousand</strong>ths are mirrors. The "-ths" suffix tells you it is on the right side of the decimal point (the fractional side).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>There is no "oneths" place! After ones, we jump directly to tenths. The decimal point itself takes the spot where "oneths" would go.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'In the number \\(6.385\\), what digit is in the hundredths place?',
                    hint: 'The hundredths place is the second digit after the decimal point.',
                    solution: 'The digit \\(8\\) is in the hundredths place. It represents \\(0.08\\).'
                },
                {
                    question: 'What is the value of the 5 in \\(12.054\\)?',
                    hint: 'Count the positions after the decimal point: first is tenths, second is hundredths.',
                    solution: 'The 5 is in the hundredths place, so its value is \\(0.05\\).'
                },
                {
                    question: 'Write the number that has 3 ones, 0 tenths, 7 hundredths, and 1 thousandth.',
                    hint: 'Put each digit in its place: ones . tenths hundredths thousandths.',
                    solution: '\\(3.071\\). The 0 in the tenths place is important as a placeholder!'
                }
            ],
            visualizations: [
                {
                    id: 'ch05-place-chart',
                    title: 'Place Value Chart',
                    description: 'Use the sliders to change each digit and see how the number is built from its place values!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 380, scale: 40, originX: 40, originY: 350});
                        var digits = {tens: 0, ones: 4, tenths: 7, hundredths: 2, thousandths: 9};

                        VizEngine.createSlider(controls, 'Tens', 0, 9, digits.tens, 1, function(v) { digits.tens = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Ones', 0, 9, digits.ones, 1, function(v) { digits.ones = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Tenths', 0, 9, digits.tenths, 1, function(v) { digits.tenths = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Hundredths', 0, 9, digits.hundredths, 1, function(v) { digits.hundredths = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Thousandths', 0, 9, digits.thousandths, 1, function(v) { digits.thousandths = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var places = [
                                {name: 'Tens', digit: digits.tens, value: digits.tens * 10, color: viz.colors.purple},
                                {name: 'Ones', digit: digits.ones, value: digits.ones * 1, color: viz.colors.blue},
                                {name: '.', digit: '.', value: null, color: viz.colors.white},
                                {name: 'Tenths', digit: digits.tenths, value: digits.tenths * 0.1, color: viz.colors.teal},
                                {name: 'Hundredths', digit: digits.hundredths, value: digits.hundredths * 0.01, color: viz.colors.orange},
                                {name: 'Thousandths', digit: digits.thousandths, value: digits.thousandths * 0.001, color: viz.colors.green}
                            ];

                            var colW = 80, startX = (viz.width - places.length * colW) / 2, headerY = 30;

                            // Header row
                            for (var i = 0; i < places.length; i++) {
                                var x = startX + i * colW;
                                ctx.fillStyle = places[i].color + '22';
                                if (places[i].name !== '.') ctx.fillRect(x + 2, headerY, colW - 4, 45);
                                ctx.fillStyle = places[i].color;
                                ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText(places[i].name, x + colW / 2, headerY + 22);
                            }

                            // Digit row
                            var digitY = headerY + 60;
                            for (var i = 0; i < places.length; i++) {
                                var x = startX + i * colW;
                                ctx.fillStyle = places[i].color;
                                ctx.font = 'bold 36px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText('' + places[i].digit, x + colW / 2, digitY + 20);
                            }

                            // Multiplier row (x10, x1, x0.1, etc.)
                            var multY = digitY + 55;
                            var multipliers = ['\u00d710', '\u00d71', '', '\u00d70.1', '\u00d70.01', '\u00d70.001'];
                            for (var i = 0; i < places.length; i++) {
                                if (i === 2) continue;
                                var x = startX + i * colW;
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(multipliers[i], x + colW / 2, multY);
                            }

                            // Value row
                            var valY = multY + 30;
                            for (var i = 0; i < places.length; i++) {
                                if (places[i].value === null) continue;
                                var x = startX + i * colW;
                                ctx.fillStyle = places[i].color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                var vStr = places[i].value < 1 && places[i].value > 0 ? places[i].value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '') : '' + places[i].value;
                                if (places[i].value === 0) vStr = '0';
                                ctx.fillText('= ' + vStr, x + colW / 2, valY);
                            }

                            // Total
                            var total = digits.tens * 10 + digits.ones + digits.tenths * 0.1 + digits.hundredths * 0.01 + digits.thousandths * 0.001;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Number: ' + total.toFixed(3), viz.width / 2, valY + 55);

                            // Visual bar showing relative sizes
                            var barY = valY + 85;
                            var maxBarW = 400;
                            var barH = 14;
                            var barData = [
                                {val: digits.tens * 10, color: viz.colors.purple},
                                {val: digits.ones, color: viz.colors.blue},
                                {val: digits.tenths * 0.1, color: viz.colors.teal},
                                {val: digits.hundredths * 0.01, color: viz.colors.orange},
                                {val: digits.thousandths * 0.001, color: viz.colors.green}
                            ];
                            if (total > 0) {
                                var cumX = (viz.width - maxBarW) / 2;
                                for (var i = 0; i < barData.length; i++) {
                                    var w = (barData[i].val / total) * maxBarW;
                                    if (w > 0.5) {
                                        ctx.fillStyle = barData[i].color + '88';
                                        ctx.fillRect(cumX, barY, w, barH);
                                        cumX += w;
                                    }
                                }
                                ctx.strokeStyle = viz.colors.white + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect((viz.width - maxBarW) / 2, barY, maxBarW, barH);
                            }
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Contribution of each place value', viz.width / 2, barY + barH + 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 2: Reading & Writing Decimals
        // ============================================================
        {
            id: 'ch05-sec02',
            title: 'Reading & Writing Decimals',
            content: `
                <h2>Reading &amp; Writing Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Three Ways to Write a Decimal</div>
                    <div class="env-body">
                        <p>Just like whole numbers, decimals can be written in <strong>standard form</strong>, <strong>expanded form</strong>, and <strong>word form</strong>. Mastering all three helps you truly understand what each decimal means!</p>
                    </div>
                </div>

                <h3>Standard Form</h3>
                <p>This is the normal way we write decimals: \\(3.47\\), \\(0.006\\), \\(12.5\\).</p>

                <h3>Expanded Form</h3>
                <p>Expanded form breaks the number into the sum of each digit's value:</p>
                \\[3.47 = 3 + 0.4 + 0.07\\]
                \\[12.503 = 10 + 2 + 0.5 + 0.003\\]

                <h3>Word Form</h3>
                <p>To read a decimal in words:</p>
                <ol>
                    <li>Read the whole number part normally.</li>
                    <li>Say <strong>"and"</strong> for the decimal point.</li>
                    <li>Read the decimal part as a whole number, then say the name of the last place value.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>\\(3.47\\) in word form: <strong>"three and forty-seven hundredths"</strong></p>
                        <p>The last digit (7) is in the hundredths place, so we say "hundredths."</p>
                        <p>\\(0.008\\) in word form: <strong>"eight thousandths"</strong></p>
                        <p>\\(12.5\\) in word form: <strong>"twelve and five tenths"</strong></p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-number-expander"></div>

                <div class="env-block remark">
                    <div class="env-title">Fun Fact</div>
                    <div class="env-body">
                        <p>When people say "three point four seven," they are using an informal shortcut. The mathematically correct way to say \\(3.47\\) is "three and forty-seven hundredths." Both are understood, but the word form shows you really understand the place values!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>Do not confuse "tens" with "tenths" or "hundreds" with "hundredths" when reading and writing. The <strong>-ths</strong> makes a huge difference! Tens = 10, tenths = 0.1.</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Write \\(7.206\\) in expanded form.',
                    hint: 'Break apart each digit: 7 ones, 2 tenths, 0 hundredths, 6 thousandths.',
                    solution: '\\(7.206 = 7 + 0.2 + 0.006\\). The 0 hundredths contributes nothing to the sum.'
                },
                {
                    question: 'Write "fifteen and thirty-two hundredths" in standard form.',
                    hint: '"Fifteen" is the whole number part. "Thirty-two hundredths" means 32 in the last two decimal places.',
                    solution: '\\(15.32\\).'
                },
                {
                    question: 'Write \\(0.065\\) in word form.',
                    hint: 'The last digit (5) is in the thousandths place. Read the decimal part (065) as "sixty-five."',
                    solution: '"Sixty-five thousandths." Note: the leading zero after the decimal point makes it thousandths, not hundredths.'
                }
            ],
            visualizations: [
                {
                    id: 'ch05-number-expander',
                    title: 'Number Expander',
                    description: 'See each digit expand into its full value. Press Expand to see the breakdown!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 350, scale: 40, originX: 40, originY: 320});
                        var expanded = false;
                        var number = 3.47;

                        VizEngine.createSlider(controls, 'Number', 0.01, 99.99, 3.47, 0.01, function(v) {
                            number = Math.round(v * 1000) / 1000;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Toggle Expand', function() { expanded = !expanded; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var numStr = number.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
                            if (numStr.indexOf('.') === -1) numStr = numStr + '.0';

                            // Standard form
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 32px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText(numStr, viz.width / 2, 45);

                            if (!expanded) {
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '16px -apple-system,sans-serif';
                                ctx.fillText('Press "Toggle Expand" to see the breakdown!', viz.width / 2, 100);
                                return;
                            }

                            // Parse digits
                            var parts = numStr.split('.');
                            var wholePart = parts[0] || '0';
                            var decPart = parts[1] || '';
                            var items = [];
                            var colors = [viz.colors.purple, viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green];
                            var placeNames = [];

                            // Whole digits
                            var wholeValues = [1000, 100, 10, 1];
                            var wholeNames = ['Thousands', 'Hundreds', 'Tens', 'Ones'];
                            var startIdx = 4 - wholePart.length;
                            for (var i = 0; i < wholePart.length; i++) {
                                var d = parseInt(wholePart[i]);
                                var pIdx = startIdx + i;
                                if (d > 0) items.push({digit: d, value: d * wholeValues[pIdx], place: wholeNames[pIdx], color: colors[items.length % colors.length]});
                            }

                            // Decimal digits
                            var decValues = [0.1, 0.01, 0.001];
                            var decNames = ['Tenths', 'Hundredths', 'Thousandths'];
                            for (var i = 0; i < decPart.length; i++) {
                                var d = parseInt(decPart[i]);
                                if (d > 0) items.push({digit: d, value: d * decValues[i], place: decNames[i], color: colors[items.length % colors.length]});
                            }

                            // Draw expanded items
                            var y = 90;
                            var spacing = Math.min(50, (viz.height - 150) / Math.max(items.length, 1));
                            for (var i = 0; i < items.length; i++) {
                                var item = items[i];
                                var iy = y + i * spacing;

                                ctx.fillStyle = item.color + '33';
                                ctx.fillRect(100, iy - 14, 360, 32);

                                ctx.fillStyle = item.color;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(item.place + ':', 110, iy);
                                ctx.textAlign = 'center';
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.fillText(item.digit, 280, iy);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('\u00d7', 310, iy);
                                ctx.fillStyle = item.color;
                                var valStr = item.value < 1 ? item.value.toString() : '' + (item.value >= 1 ? Math.round(item.value / item.digit) : item.value / item.digit);
                                ctx.fillText(valStr, 360, iy);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('=', 400, iy);
                                ctx.fillStyle = item.color;
                                var resStr = item.value < 0.01 ? item.value.toFixed(3) : (item.value < 1 ? item.value.toFixed(2).replace(/0+$/, '') : '' + item.value);
                                ctx.fillText(resStr, 445, iy);

                                if (i < items.length - 1) {
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = '18px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('+', 80, iy + spacing / 2);
                                }
                            }

                            // Sum line
                            var sumY = y + items.length * spacing + 10;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(100, sumY); ctx.lineTo(460, sumY); ctx.stroke();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('= ' + numStr, viz.width / 2, sumY + 25);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        },
        // ============================================================
        // SECTION 3: Rounding Decimals
        // ============================================================
        {
            id: 'ch05-sec03',
            title: 'Rounding Decimals',
            content: `
                <h2>Rounding Decimals</h2>

                <div class="env-block intuition">
                    <div class="env-title">Close Enough!</div>
                    <div class="env-body">
                        <p>Sometimes you do not need an exact decimal. If something costs $4.973, you round to $4.97 (nearest hundredth) or even $5.00 (nearest whole number). Rounding means finding the <strong>closest "nice" number</strong> to where you are.</p>
                    </div>
                </div>

                <h3>The Rounding Rule</h3>

                <ol>
                    <li>Find the digit in the place you are rounding to.</li>
                    <li>Look at the <strong>next digit to the right</strong> (the "neighbor").</li>
                    <li>If the neighbor is <strong>5 or more</strong>, round <strong>up</strong> (add 1 to the rounding digit).</li>
                    <li>If the neighbor is <strong>4 or less</strong>, round <strong>down</strong> (keep the rounding digit the same).</li>
                    <li>Drop all digits after the rounding place.</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Round \\(3.847\\) to the nearest tenth:</strong></p>
                        <ul>
                            <li>The tenths digit is \\(8\\).</li>
                            <li>The neighbor (hundredths digit) is \\(4\\).</li>
                            <li>Since \\(4 \\lt 5\\), round down: keep the 8.</li>
                            <li>Answer: \\(3.8\\)</li>
                        </ul>
                        <p><strong>Round \\(3.847\\) to the nearest hundredth:</strong></p>
                        <ul>
                            <li>The hundredths digit is \\(4\\).</li>
                            <li>The neighbor (thousandths digit) is \\(7\\).</li>
                            <li>Since \\(7 \\geq 5\\), round up: change 4 to 5.</li>
                            <li>Answer: \\(3.85\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch05-rounding-zoom"></div>

                <div class="env-block remark">
                    <div class="env-title">Think of a Number Line</div>
                    <div class="env-body">
                        <p>Rounding is really about asking: "Is this number closer to the lower value or the higher value?" On a number line, \\(3.847\\) is between \\(3.8\\) and \\(3.9\\). Since \\(3.847\\) is closer to \\(3.8\\) (it is only 0.047 away, versus 0.053 from 3.9), we round down to \\(3.8\\).</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body">
                        <p>When rounding up causes a digit to go from 9 to 10, you need to carry over. For example, rounding \\(2.96\\) to the nearest tenth: the neighbor is 6 (round up), so 9 becomes 10, which means the answer is \\(3.0\\), not \\(2.10\\)!</p>
                    </div>
                </div>
            `,
            exercises: [
                {
                    question: 'Round \\(5.673\\) to the nearest tenth.',
                    hint: 'The tenths digit is 6. Look at the hundredths digit (7). Is it 5 or more?',
                    solution: 'The neighbor (7) is 5 or more, so round up: \\(5.673 \\approx 5.7\\).'
                },
                {
                    question: 'Round \\(12.345\\) to the nearest hundredth.',
                    hint: 'The hundredths digit is 4. Look at the thousandths digit (5). Is it 5 or more?',
                    solution: 'The neighbor (5) is exactly 5, so round up: \\(12.345 \\approx 12.35\\).'
                },
                {
                    question: 'Round \\(9.998\\) to the nearest tenth.',
                    hint: 'The tenths digit is 9. The neighbor is 9 (round up). But 9+1 = 10, so you need to carry!',
                    solution: 'Rounding up the 9 in the tenths place gives 10, so we carry: \\(9.998 \\approx 10.0\\).'
                }
            ],
            visualizations: [
                {
                    id: 'ch05-rounding-zoom',
                    title: 'Number Line Zoom: See Where the Number Falls',
                    description: 'The number line zooms in to show exactly where a decimal sits between two rounded values. Adjust the number!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 340, scale: 40, originX: 40, originY: 310});
                        var number = 3.847;
                        var roundTo = 1; // 1 = tenth, 2 = hundredth

                        VizEngine.createSlider(controls, 'Number', 0, 10, 3.847, 0.001, function(v) { number = Math.round(v * 1000) / 1000; draw(); });
                        VizEngine.createSlider(controls, 'Round to (1=tenth, 2=hundredth)', 1, 2, 1, 1, function(v) { roundTo = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var factor = Math.pow(10, roundTo);
                            var lower = Math.floor(number * factor) / factor;
                            var upper = lower + 1 / factor;
                            var position = (number - lower) / (upper - lower);

                            var lineY = 120, lineX1 = 60, lineX2 = 500;
                            var lineW = lineX2 - lineX1;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            var placeName = roundTo === 1 ? 'tenth' : 'hundredth';
                            ctx.fillText('Rounding ' + number.toFixed(3) + ' to the nearest ' + placeName, viz.width / 2, 30);

                            // Number line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(lineX1, lineY); ctx.lineTo(lineX2, lineY); ctx.stroke();

                            // End ticks and labels
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(lineX1, lineY - 12); ctx.lineTo(lineX1, lineY + 12); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(lineX2, lineY - 12); ctx.lineTo(lineX2, lineY + 12); ctx.stroke();

                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(lower.toFixed(roundTo), lineX1, lineY + 30);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText(upper.toFixed(roundTo), lineX2, lineY + 30);

                            // Midpoint
                            var midX = lineX1 + lineW / 2;
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(midX, lineY - 20); ctx.lineTo(midX, lineY + 20); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('midpoint', midX, lineY + 45);

                            // Current number marker
                            var markerX = lineX1 + position * lineW;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(markerX, lineY - 8);
                            ctx.lineTo(markerX - 8, lineY - 24);
                            ctx.lineTo(markerX + 8, lineY - 24);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(number.toFixed(3), markerX, lineY - 32);

                            // Distance labels
                            var distLower = (number - lower).toFixed(roundTo + 1);
                            var distUpper = (upper - number).toFixed(roundTo + 1);
                            ctx.fillStyle = viz.colors.blue + 'aa';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('distance: ' + distLower, (lineX1 + markerX) / 2, lineY + 65);
                            ctx.fillStyle = viz.colors.orange + 'aa';
                            ctx.fillText('distance: ' + distUpper, (markerX + lineX2) / 2, lineY + 65);

                            // Coloring the two halves
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fillRect(lineX1, lineY - 6, lineW / 2, 12);
                            ctx.fillStyle = viz.colors.orange + '22';
                            ctx.fillRect(midX, lineY - 6, lineW / 2, 12);

                            // Result
                            var rounded = Math.round(number * factor) / factor;
                            var direction = position < 0.5 ? 'DOWN' : 'UP';
                            var dirColor = position < 0.5 ? viz.colors.blue : viz.colors.orange;
                            ctx.fillStyle = dirColor;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Round ' + direction + ' to ' + rounded.toFixed(roundTo), viz.width / 2, lineY + 100);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Closer to ' + (position < 0.5 ? lower.toFixed(roundTo) : upper.toFixed(roundTo)) + '!', viz.width / 2, lineY + 125);
                        }

                        draw();
                        return viz;
                    }
                }
            ]
        }
    ]
});
