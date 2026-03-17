// === Chapter 9: Proportions ===
// Fun, colorful content for elementary/middle school students (ages 8-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Proportions',
    subtitle: 'When two ratios are equal, amazing things happen!',
    sections: [
        // ============================================================
        // SECTION 1: What Is a Proportion?
        // ============================================================
        {
            id: 'ch09-sec01',
            title: 'What is a Proportion?',
            content: `
                <h2>What is a Proportion?</h2>

                <div class="env-block intuition">
                    <div class="env-title">From Ratios to Proportions</div>
                    <div class="env-body">
                        <p>In Chapter 8, you learned that equivalent ratios are different ways of expressing the same comparison. A <strong>proportion</strong> is simply an equation that says two ratios are equal. Proportions are the secret engine behind map reading, recipe scaling, and even building skyscrapers!</p>
                    </div>
                </div>

                <p>A <strong>proportion</strong> is a statement that two ratios are equal:</p>
                <p style="text-align:center; font-size:1.2em;">\\(\\dfrac{a}{b} = \\dfrac{c}{d}\\)</p>

                <p>We read this as "a is to b as c is to d."</p>

                <div class="env-block example">
                    <div class="env-title">Is This a Proportion?</div>
                    <div class="env-body">
                        <p>Check: Is \\(\\dfrac{3}{4} = \\dfrac{9}{12}\\) a true proportion?</p>
                        <p><strong>Cross-multiply:</strong> \\(3 \\times 12 = 36\\) and \\(4 \\times 9 = 36\\).</p>
                        <p>The cross-products are equal, so <strong>yes</strong>, it is a proportion!</p>
                    </div>
                </div>

                <h3>The Cross-Product Rule</h3>

                <p>For any proportion \\(\\dfrac{a}{b} = \\dfrac{c}{d}\\):</p>
                <p style="text-align:center; font-size:1.1em;">\\(a \\times d = b \\times c\\)</p>
                <p>If the cross-products are equal, the ratios form a proportion. If not, they don't!</p>

                <div class="env-block remark">
                    <div class="env-title">Think of a Balance Scale</div>
                    <div class="env-body">
                        <p>Imagine a balance scale with one ratio on each side. When the cross-products match, the scale is perfectly balanced. When they don't match, one side tips!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch09-balance-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch09-balance-viz',
                    title: 'Proportion Balance Scale',
                    description: 'Adjust the four numbers. When the cross-products match, the scale balances!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 40, originX: 280, originY: 300});
                        var ctx = viz.ctx;
                        var a = 3, b = 4, c = 9, d = 12;

                        VizEngine.createSlider(controls, 'a', 1, 15, a, 1, function(v) { a = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'b', 1, 15, b, 1, function(v) { b = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'c', 1, 15, c, 1, function(v) { c = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'd', 1, 15, d, 1, function(v) { d = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var cp1 = a * d, cp2 = b * c;
                            var balanced = (cp1 === cp2);
                            var diff = cp1 - cp2;
                            var tilt = balanced ? 0 : Math.max(-0.25, Math.min(0.25, diff * 0.01));
                            // Pivot
                            var px = 280, py = 180;
                            ctx.fillStyle = viz.colors.text;
                            ctx.beginPath();
                            ctx.moveTo(px, py); ctx.lineTo(px - 20, py + 50); ctx.lineTo(px + 20, py + 50);
                            ctx.closePath(); ctx.fill();
                            // Beam
                            var beamLen = 180;
                            var lx = px - Math.cos(tilt) * beamLen;
                            var ly = py - Math.sin(tilt) * beamLen * (-1) + Math.sin(Math.abs(tilt)) * 0;
                            var rx = px + Math.cos(tilt) * beamLen;
                            var leftY = py + Math.sin(tilt) * beamLen;
                            var rightY = py - Math.sin(tilt) * beamLen;
                            ctx.strokeStyle = balanced ? viz.colors.green : viz.colors.yellow;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(px - beamLen, leftY);
                            ctx.lineTo(px + beamLen, rightY);
                            ctx.stroke();
                            // Left pan: a/b
                            var panW = 80, panH = 50;
                            ctx.fillStyle = viz.colors.blue + '44';
                            ctx.fillRect(px - beamLen - panW / 2, leftY + 5, panW, panH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(px - beamLen - panW / 2, leftY + 5, panW, panH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(a + '/' + b, px - beamLen, leftY + 36);
                            // Right pan: c/d
                            ctx.fillStyle = viz.colors.orange + '44';
                            ctx.fillRect(px + beamLen - panW / 2, rightY + 5, panW, panH);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(px + beamLen - panW / 2, rightY + 5, panW, panH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(c + '/' + d, px + beamLen, rightY + 36);
                            // Cross products
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('a x d = ' + a + ' x ' + d + ' = ' + cp1, px - beamLen, leftY - 15);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('b x c = ' + b + ' x ' + c + ' = ' + cp2, px + beamLen, rightY - 15);
                            // Verdict
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (balanced) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('Balanced! It IS a proportion!', px, 40);
                            } else {
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('Not balanced! NOT a proportion.', px, 40);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Is \\(\\dfrac{5}{8} = \\dfrac{15}{24}\\) a true proportion? Use cross-multiplication.',
                    hint: 'Compute \\(5 \\times 24\\) and \\(8 \\times 15\\). Are they equal?',
                    solution: '\\(5 \\times 24 = 120\\) and \\(8 \\times 15 = 120\\). Equal! <strong>Yes</strong>, it is a true proportion.'
                },
                {
                    question: 'Is \\(\\dfrac{4}{6} = \\dfrac{7}{9}\\) a proportion?',
                    hint: 'Cross-multiply: \\(4 \\times 9\\) vs \\(6 \\times 7\\).',
                    solution: '\\(4 \\times 9 = 36\\) and \\(6 \\times 7 = 42\\). Not equal! <strong>No</strong>, it is not a proportion.'
                },
                {
                    question: 'Write a proportion using the ratios \\(2 : 7\\). Create a second ratio that is equivalent.',
                    hint: 'Multiply both parts by any number (say 3) to build an equivalent ratio.',
                    solution: 'Multiply by 3: \\(\\dfrac{2}{7} = \\dfrac{6}{21}\\). So \\(2 : 7 = 6 : 21\\) is a proportion.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Solving Proportions
        // ============================================================
        {
            id: 'ch09-sec02',
            title: 'Solving Proportions',
            content: `
                <h2>Solving Proportions</h2>

                <div class="env-block intuition">
                    <div class="env-title">Finding the Missing Piece</div>
                    <div class="env-body">
                        <p>What if you know three of the four numbers in a proportion, and you need to find the fourth? This is one of the most practical skills in math. It pops up in cooking, shopping, science, building, and more!</p>
                    </div>
                </div>

                <h3>The Cross-Multiply-and-Divide Method</h3>

                <p>To solve \\(\\dfrac{a}{b} = \\dfrac{c}{x}\\) for \\(x\\):</p>
                <ol>
                    <li><strong>Cross-multiply:</strong> \\(a \\times x = b \\times c\\)</li>
                    <li><strong>Divide:</strong> \\(x = \\dfrac{b \\times c}{a}\\)</li>
                </ol>

                <div class="env-block example">
                    <div class="env-title">Step-by-Step Example</div>
                    <div class="env-body">
                        <p>Solve: \\(\\dfrac{3}{5} = \\dfrac{x}{20}\\)</p>
                        <p><strong>Step 1:</strong> Cross-multiply: \\(3 \\times 20 = 5 \\times x\\)</p>
                        <p><strong>Step 2:</strong> \\(60 = 5x\\)</p>
                        <p><strong>Step 3:</strong> Divide: \\(x = 60 \\div 5 = 12\\)</p>
                        <p><strong>Check:</strong> \\(\\dfrac{3}{5} = \\dfrac{12}{20}\\). Both simplify to \\(\\dfrac{3}{5}\\). Correct!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch09-solver-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Always Check Your Answer</div>
                    <div class="env-body">
                        <p>After solving, plug your answer back in and verify both cross-products are equal. This quick check catches mistakes!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch09-solver-viz',
                    title: 'Step-by-Step Proportion Solver',
                    description: 'Set three values and see the missing one solved step by step!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 40, originX: 280, originY: 300});
                        var ctx = viz.ctx;
                        var a = 3, b = 5, d = 20;

                        VizEngine.createSlider(controls, 'a (top-left)', 1, 20, a, 1, function(v) { a = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'b (bottom-left)', 1, 20, b, 1, function(v) { b = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'd (bottom-right)', 1, 30, d, 1, function(v) { d = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var x = (b * a) / a; // we solve a/b = x/d => x = a*d/b
                            var xVal = a * d / b;
                            var isWhole = Math.abs(xVal - Math.round(xVal)) < 0.001;
                            var xStr = isWhole ? '' + Math.round(xVal) : xVal.toFixed(2);
                            // Draw the proportion layout
                            var lx = 160, rx = 400, ty = 60, by = 110;
                            // Fraction bars
                            ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(lx - 30, (ty + by) / 2); ctx.lineTo(lx + 30, (ty + by) / 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rx - 30, (ty + by) / 2); ctx.lineTo(rx + 30, (ty + by) / 2); ctx.stroke();
                            // Numbers
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('' + a, lx, ty);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('' + b, lx, by + 20);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText(xStr, rx, ty);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('' + d, rx, by + 20);
                            // Equals sign
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            ctx.fillText('=', 280, (ty + by) / 2 + 6);
                            // Steps
                            var sy = 165;
                            ctx.font = '15px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Step 1: Cross-multiply', 60, sy);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(a + ' x ' + d + ' = ' + b + ' x ?', 80, sy + 24);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Step 2: Compute', 60, sy + 56);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('' + (a * d) + ' = ' + b + ' x ?', 80, sy + 80);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Step 3: Divide', 60, sy + 112);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('? = ' + (a * d) + ' / ' + b + ' = ' + xStr, 80, sy + 136);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Solve for \\(x\\): \\(\\dfrac{4}{7} = \\dfrac{x}{21}\\)',
                    hint: 'Cross-multiply: \\(4 \\times 21 = 7 \\times x\\). Then divide both sides by 7.',
                    solution: '\\(4 \\times 21 = 84\\). So \\(7x = 84\\), giving \\(x = 84 \\div 7 = 12\\). Answer: \\(x = 12\\).'
                },
                {
                    question: 'Solve for \\(n\\): \\(\\dfrac{n}{6} = \\dfrac{10}{15}\\)',
                    hint: 'Cross-multiply: \\(n \\times 15 = 6 \\times 10\\).',
                    solution: '\\(15n = 60\\), so \\(n = 60 \\div 15 = 4\\). Check: \\(\\dfrac{4}{6} = \\dfrac{2}{3}\\) and \\(\\dfrac{10}{15} = \\dfrac{2}{3}\\). Correct!'
                },
                {
                    question: 'If 5 notebooks cost $8, how much do 15 notebooks cost?',
                    hint: 'Set up a proportion: \\(\\dfrac{5}{8} = \\dfrac{15}{x}\\). Solve for \\(x\\).',
                    solution: '\\(5x = 8 \\times 15 = 120\\). So \\(x = 120 \\div 5 = 24\\). <strong>15 notebooks cost $24.</strong>'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Scale Drawings & Maps
        // ============================================================
        {
            id: 'ch09-sec03',
            title: 'Scale Drawings & Maps',
            content: `
                <h2>Scale Drawings &amp; Maps</h2>

                <div class="env-block intuition">
                    <div class="env-title">Proportions in the Real World</div>
                    <div class="env-body">
                        <p>Have you ever looked at a map and noticed a little bar labeled "1 cm = 10 km"? That is a <strong>scale</strong>. Scale drawings use proportions to shrink (or enlarge) real objects so they fit on paper while keeping all the proportions perfect!</p>
                    </div>
                </div>

                <h3>What is a Scale Factor?</h3>

                <p>The <strong>scale factor</strong> is the ratio of the drawing size to the real size.</p>
                <ul>
                    <li>Scale \\(1 : 100\\) means 1 cm on the drawing = 100 cm in real life.</li>
                    <li>Scale \\(1 : 50{,}000\\) on a map means 1 cm = 50,000 cm = 500 m.</li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Using a Map Scale</div>
                    <div class="env-body">
                        <p>A map has scale \\(1 : 25{,}000\\). Two cities are 8 cm apart on the map. How far apart are they in real life?</p>
                        <p style="text-align:center;">\\(\\dfrac{1}{25{,}000} = \\dfrac{8}{x}\\)</p>
                        <p style="text-align:center;">\\(x = 8 \\times 25{,}000 = 200{,}000 \\text{ cm} = 2 \\text{ km}\\)</p>
                    </div>
                </div>

                <h3>Enlargement and Reduction</h3>

                <p>A scale factor <strong>greater than 1</strong> means the drawing is <em>bigger</em> than the original (enlargement). A scale factor <strong>less than 1</strong> means it is <em>smaller</em> (reduction).</p>

                <div class="viz-placeholder" data-viz="ch09-scale-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Fun Fact</div>
                    <div class="env-body">
                        <p>Architects use scale drawings every day. A blueprint with scale \\(1 : 50\\) means a 10 m wall appears as a 20 cm line. Every measurement on the blueprint is proportional to the real building!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch09-scale-viz',
                    title: 'Scale Drawing Explorer',
                    description: 'Adjust the scale factor to see how a house drawing changes size. Real dimensions update!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var scaleFactor = 1.0;
                        var realW = 120, realH = 90; // "real" house pixels at scale=1

                        VizEngine.createSlider(controls, 'Scale', 0.3, 3.0, scaleFactor, 0.1, function(v) { scaleFactor = v; draw(); });
                        VizEngine.createButton(controls, 'Reset (1x)', function() { scaleFactor = 1.0; draw(); });

                        function draw() {
                            viz.clear();
                            var w = realW * scaleFactor;
                            var h = realH * scaleFactor;
                            var cx = 280, baseY = 260;
                            var x = cx - w / 2, y = baseY - h;
                            // House body
                            ctx.fillStyle = viz.colors.blue + '55';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.fillRect(x, y, w, h);
                            ctx.strokeRect(x, y, w, h);
                            // Roof
                            ctx.fillStyle = viz.colors.orange + '55';
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(x - w * 0.1, y);
                            ctx.lineTo(cx, y - h * 0.5);
                            ctx.lineTo(x + w + w * 0.1, y);
                            ctx.closePath();
                            ctx.fill(); ctx.stroke();
                            // Door
                            var dw = w * 0.2, dh = h * 0.4;
                            ctx.fillStyle = viz.colors.purple + '88';
                            ctx.fillRect(cx - dw / 2, baseY - dh, dw, dh);
                            // Window
                            var ww = w * 0.15;
                            ctx.fillStyle = viz.colors.yellow + '66';
                            ctx.fillRect(x + w * 0.15, y + h * 0.2, ww, ww);
                            ctx.fillRect(x + w * 0.65, y + h * 0.2, ww, ww);
                            // Dimension labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            // Width label
                            ctx.fillText((realW * scaleFactor / 10).toFixed(1) + ' m', cx, baseY + 20);
                            // Height label
                            ctx.save();
                            ctx.translate(x - 15, y + h / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText((realH * scaleFactor / 10).toFixed(1) + ' m', 0, 0);
                            ctx.restore();
                            // Info
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            var label = scaleFactor < 0.95 ? 'Reduction' : (scaleFactor > 1.05 ? 'Enlargement' : 'Original');
                            ctx.fillStyle = scaleFactor < 0.95 ? viz.colors.teal : (scaleFactor > 1.05 ? viz.colors.orange : viz.colors.green);
                            ctx.fillText('Scale: ' + scaleFactor.toFixed(1) + 'x  (' + label + ')', 280, 30);
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Original: ' + (realW / 10).toFixed(0) + ' m x ' + (realH / 10).toFixed(0) + ' m', 280, 52);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A map has a scale of \\(1 : 50{,}000\\). Two towns are 6 cm apart on the map. What is the real distance in km?',
                    hint: 'Multiply 6 cm by 50,000 to get cm, then convert to km (divide by 100,000).',
                    solution: '\\(6 \\times 50{,}000 = 300{,}000\\) cm \\(= 3{,}000\\) m \\(= 3\\) km. The towns are <strong>3 km</strong> apart.'
                },
                {
                    question: 'A model car is built at a scale of \\(1 : 24\\). If the real car is 4.8 m long, how long is the model?',
                    hint: 'Divide the real length by the scale factor: \\(4.8 \\div 24\\).',
                    solution: '\\(4.8 \\div 24 = 0.2\\) m \\(= 20\\) cm. The model car is <strong>20 cm</strong> long.'
                },
                {
                    question: 'An architect draws a room that is 5 cm wide on paper. The scale is \\(1 : 40\\). What is the real width?',
                    hint: 'Set up: \\(\\dfrac{1}{40} = \\dfrac{5}{x}\\). Solve for \\(x\\).',
                    solution: '\\(x = 5 \\times 40 = 200\\) cm \\(= 2\\) m. The room is <strong>2 meters</strong> wide.'
                }
            ]
        }
    ]
});
