// === Chapter 11: Applications ===
// Fun, colorful content for elementary/middle school students (ages 8-12)

window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Applications',
    subtitle: 'Put it all together with real-world adventures!',
    sections: [
        // ============================================================
        // SECTION 1: Cooking & Recipes
        // ============================================================
        {
            id: 'ch11-sec01',
            title: 'Cooking & Recipes',
            content: `
                <h2>Cooking &amp; Recipes</h2>

                <div class="env-block intuition">
                    <div class="env-title">Math You Can Eat!</div>
                    <div class="env-body">
                        <p>Cooking is secretly a math class. Every recipe is a set of ratios! When you double a recipe for a party or halve it for a snack, you are using fractions, ratios, and proportions. Let's see how it all works in the kitchen.</p>
                    </div>
                </div>

                <h3>Scaling Recipes Up and Down</h3>

                <p>A recipe for 4 servings of pancakes calls for:</p>
                <ul>
                    <li>2 cups flour</li>
                    <li>\\(1\\frac{1}{2}\\) cups milk</li>
                    <li>2 eggs</li>
                    <li>\\(\\frac{1}{4}\\) cup sugar</li>
                </ul>

                <p>What if you need 6 servings? The <strong>scale factor</strong> is \\(\\dfrac{6}{4} = 1.5\\). Multiply every ingredient by 1.5!</p>

                <div class="env-block example">
                    <div class="env-title">Scaling from 4 to 6 Servings</div>
                    <div class="env-body">
                        <ul>
                            <li>Flour: \\(2 \\times 1.5 = 3\\) cups</li>
                            <li>Milk: \\(1.5 \\times 1.5 = 2.25 = 2\\frac{1}{4}\\) cups</li>
                            <li>Eggs: \\(2 \\times 1.5 = 3\\) eggs</li>
                            <li>Sugar: \\(0.25 \\times 1.5 = 0.375 = \\frac{3}{8}\\) cup</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Kitchen Tip</div>
                    <div class="env-body">
                        <p>When a scaled amount is awkward (like \\(\\frac{3}{8}\\) cup), round to the nearest convenient measurement. In cooking, a little more or less usually works fine!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch11-recipe-viz"></div>
            `,
            visualizations: [
                {
                    id: 'ch11-recipe-viz',
                    title: 'Recipe Scaler',
                    description: 'Choose a target number of servings and watch all ingredients update!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var baseServings = 4;
                        var targetServings = 4;
                        var ingredients = [
                            {name: 'Flour', amt: 2, unit: 'cups'},
                            {name: 'Milk', amt: 1.5, unit: 'cups'},
                            {name: 'Eggs', amt: 2, unit: ''},
                            {name: 'Sugar', amt: 0.25, unit: 'cup'},
                            {name: 'Butter', amt: 0.5, unit: 'cup'}
                        ];
                        var colors = ['#58a6ff', '#f0883e', '#d29922', '#bc8cff', '#3fb950'];

                        VizEngine.createSlider(controls, 'Servings', 1, 12, targetServings, 1, function(v) {
                            targetServings = Math.round(v); draw();
                        });

                        function frac(v) {
                            if (Math.abs(v - Math.round(v)) < 0.01) return '' + Math.round(v);
                            var whole = Math.floor(v);
                            var rem = v - whole;
                            var fracs = [
                                [0.125, '1/8'], [0.25, '1/4'], [0.333, '1/3'],
                                [0.375, '3/8'], [0.5, '1/2'], [0.667, '2/3'],
                                [0.75, '3/4'], [0.875, '7/8']
                            ];
                            var best = v.toFixed(2);
                            for (var i = 0; i < fracs.length; i++) {
                                if (Math.abs(rem - fracs[i][0]) < 0.05) {
                                    best = whole > 0 ? whole + ' ' + fracs[i][1] : fracs[i][1];
                                    break;
                                }
                            }
                            return best;
                        }

                        function draw() {
                            viz.clear();
                            var scale = targetServings / baseServings;
                            // Title
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Pancake Recipe (' + targetServings + ' servings)', 280, 30);
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Scale factor: ' + baseServings + ' -> ' + targetServings + ' = x' + scale.toFixed(2), 280, 52);
                            // Ingredient bars
                            var barX = 140, maxBarW = 300, rowH = 44;
                            var maxAmt = 0;
                            for (var k = 0; k < ingredients.length; k++) {
                                var scaledK = ingredients[k].amt * scale;
                                if (scaledK > maxAmt) maxAmt = scaledK;
                            }
                            for (var i = 0; i < ingredients.length; i++) {
                                var ing = ingredients[i];
                                var scaled = ing.amt * scale;
                                var barW = maxAmt > 0 ? (scaled / maxAmt) * maxBarW : 0;
                                var yPos = 75 + i * rowH;
                                // Label
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillStyle = colors[i];
                                ctx.fillText(ing.name, barX - 10, yPos + 16);
                                // Bar
                                ctx.fillStyle = colors[i] + '66';
                                ctx.beginPath(); ctx.roundRect(barX, yPos, Math.max(barW, 4), 26, 5); ctx.fill();
                                ctx.strokeStyle = colors[i]; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.roundRect(barX, yPos, Math.max(barW, 4), 26, 5); ctx.stroke();
                                // Amount
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(frac(scaled) + ' ' + ing.unit, barX + barW + 8, yPos + 16);
                            }
                            // Base vs scaled note
                            ctx.textAlign = 'center';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('Original recipe: ' + baseServings + ' servings. Each amount multiplied by ' + scale.toFixed(2), 280, 300);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A cookie recipe for 24 cookies uses 3 cups of flour. How much flour for 36 cookies?',
                    hint: 'Scale factor = \\(36 / 24 = 1.5\\). Multiply the flour amount by the scale factor.',
                    solution: '\\(3 \\times 1.5 = 4.5\\) cups. You need <strong>4.5 cups of flour</strong> for 36 cookies.'
                },
                {
                    question: 'A smoothie recipe for 2 servings uses \\(\\frac{3}{4}\\) cup yogurt. How much for 5 servings?',
                    hint: 'Scale factor = \\(5 / 2 = 2.5\\). Multiply \\(\\frac{3}{4}\\) by 2.5.',
                    solution: '\\(\\frac{3}{4} \\times 2.5 = \\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8} = 1\\frac{7}{8}\\) cups of yogurt.'
                },
                {
                    question: 'You only want to make half a recipe. The recipe calls for \\(2\\frac{1}{3}\\) cups of rice. How much do you need?',
                    hint: 'Half means scale factor = \\(\\frac{1}{2}\\). Multiply \\(2\\frac{1}{3}\\) by \\(\\frac{1}{2}\\).',
                    solution: '\\(2\\frac{1}{3} = \\frac{7}{3}\\). Half: \\(\\frac{7}{3} \\times \\frac{1}{2} = \\frac{7}{6} = 1\\frac{1}{6}\\) cups.'
                }
            ]
        },

        // ============================================================
        // SECTION 2: Money & Shopping
        // ============================================================
        {
            id: 'ch11-sec02',
            title: 'Money & Shopping',
            content: `
                <h2>Money &amp; Shopping</h2>

                <div class="env-block intuition">
                    <div class="env-title">Be a Smart Shopper!</div>
                    <div class="env-body">
                        <p>Every trip to the store is a chance to use fractions, decimals, and percents. Comparing prices, calculating discounts, figuring out tips, and checking your change all use the skills from this whole course!</p>
                    </div>
                </div>

                <h3>Best-Buy Comparisons</h3>

                <p>When two products come in different sizes, finding the <strong>unit price</strong> tells you which is cheaper.</p>

                <div class="env-block example">
                    <div class="env-title">Which Juice is Cheaper?</div>
                    <div class="env-body">
                        <p>Juice A: 1.5 L for $3.60. Juice B: 2 L for $4.40.</p>
                        <ul>
                            <li>Unit price A: \\(\\$3.60 \\div 1.5 = \\$2.40\\) per liter</li>
                            <li>Unit price B: \\(\\$4.40 \\div 2 = \\$2.20\\) per liter</li>
                        </ul>
                        <p>Juice B is cheaper per liter!</p>
                    </div>
                </div>

                <h3>Tips and Tax</h3>

                <p>At a restaurant, you might leave a <strong>tip</strong> (usually 10-20% of the bill). Sales <strong>tax</strong> is also a percent added to the price.</p>

                <div class="env-block example">
                    <div class="env-title">Dinner Math</div>
                    <div class="env-body">
                        <p>Your family's dinner bill is $65. Tax is 8% and you want to leave a 15% tip (on the pre-tax amount).</p>
                        <ul>
                            <li>Tax: \\(65 \\times 0.08 = \\$5.20\\)</li>
                            <li>Tip: \\(65 \\times 0.15 = \\$9.75\\)</li>
                            <li>Total: \\(65 + 5.20 + 9.75 = \\$79.95\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="ch11-shopping-viz"></div>

                <h3>Making Change</h3>

                <div class="env-block remark">
                    <div class="env-title">Quick Check</div>
                    <div class="env-body">
                        <p>Always estimate before calculating! If a $45 item is 20% off, the discount is about $9, so you should pay around $36. If the register says $52, something is wrong!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch11-shopping-viz',
                    title: 'Shopping Calculator',
                    description: 'Compare two products and add tax to find the true cost!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 310, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var priceA = 5.00, sizeA = 500;
                        var priceB = 8.50, sizeB = 900;
                        var taxRate = 10;

                        VizEngine.createSlider(controls, 'Item A price $', 1, 20, priceA, 0.5, function(v) { priceA = v; draw(); });
                        VizEngine.createSlider(controls, 'Item A size (g)', 100, 2000, sizeA, 50, function(v) { sizeA = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Item B price $', 1, 20, priceB, 0.5, function(v) { priceB = v; draw(); });
                        VizEngine.createSlider(controls, 'Item B size (g)', 100, 2000, sizeB, 50, function(v) { sizeB = Math.round(v); draw(); });
                        VizEngine.createSlider(controls, 'Tax %', 0, 20, taxRate, 1, function(v) { taxRate = Math.round(v); draw(); });

                        function draw() {
                            viz.clear();
                            var unitA = priceA / sizeA * 100; // per 100g
                            var unitB = priceB / sizeB * 100;
                            var totalA = priceA * (1 + taxRate / 100);
                            var totalB = priceB * (1 + taxRate / 100);
                            var winnerA = unitA <= unitB;
                            // Item A card
                            var cx1 = 155, cx2 = 405, cardW = 200, cardH = 130, cy = 40;
                            // Card A
                            ctx.fillStyle = winnerA ? viz.colors.green + '22' : '#1a1a40';
                            ctx.strokeStyle = winnerA ? viz.colors.green : '#30363d';
                            ctx.lineWidth = winnerA ? 2 : 1;
                            ctx.beginPath(); ctx.roundRect(cx1 - cardW / 2, cy, cardW, cardH, 10); ctx.fill(); ctx.stroke();
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Item A', cx1, cy + 24);
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('$' + priceA.toFixed(2) + ' for ' + sizeA + 'g', cx1, cy + 48);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('$' + unitA.toFixed(2) + ' per 100g', cx1, cy + 74);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('With ' + taxRate + '% tax: $' + totalA.toFixed(2), cx1, cy + 100);
                            if (winnerA) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText('BETTER VALUE', cx1, cy + 120);
                            }
                            // Card B
                            ctx.fillStyle = !winnerA ? viz.colors.green + '22' : '#1a1a40';
                            ctx.strokeStyle = !winnerA ? viz.colors.green : '#30363d';
                            ctx.lineWidth = !winnerA ? 2 : 1;
                            ctx.beginPath(); ctx.roundRect(cx2 - cardW / 2, cy, cardW, cardH, 10); ctx.fill(); ctx.stroke();
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Item B', cx2, cy + 24);
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('$' + priceB.toFixed(2) + ' for ' + sizeB + 'g', cx2, cy + 48);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('$' + unitB.toFixed(2) + ' per 100g', cx2, cy + 74);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('With ' + taxRate + '% tax: $' + totalB.toFixed(2), cx2, cy + 100);
                            if (!winnerA) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillText('BETTER VALUE', cx2, cy + 120);
                            }
                            // VS
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 20px -apple-system,sans-serif';
                            ctx.fillText('VS', 280, cy + 70);
                            // Savings
                            var diff = Math.abs(unitA - unitB);
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Difference: $' + diff.toFixed(2) + ' per 100g', 280, cy + cardH + 40);
                            var savePct = (diff / Math.max(unitA, unitB) * 100);
                            ctx.fillText('(' + savePct.toFixed(1) + '% cheaper)', 280, cy + cardH + 62);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Cereal A costs $4.80 for 600g. Cereal B costs $3.50 for 400g. Which is the better buy?',
                    hint: 'Find the cost per 100g for each: divide price by (grams / 100).',
                    solution: 'A: \\($4.80 / 6 = $0.80\\) per 100g. B: \\($3.50 / 4 = $0.875\\) per 100g. <strong>Cereal A</strong> is cheaper per 100g.'
                },
                {
                    question: 'Your lunch costs $12.50. You want to leave a 20% tip. How much tip do you leave, and what is the total?',
                    hint: '20% of $12.50: multiply by 0.20.',
                    solution: 'Tip: \\(12.50 \\times 0.20 = \\$2.50\\). Total: \\(12.50 + 2.50 = \\$15.00\\).'
                },
                {
                    question: 'A toy costs $24. It is on sale for 30% off, and then 5% tax is added. What do you pay?',
                    hint: 'First find the sale price (70% of $24), then add 5% tax.',
                    solution: 'Sale price: \\(24 \\times 0.70 = \\$16.80\\). Tax: \\(16.80 \\times 1.05 = \\$17.64\\). You pay <strong>$17.64</strong>.'
                }
            ]
        },

        // ============================================================
        // SECTION 3: Sports & Statistics
        // ============================================================
        {
            id: 'ch11-sec03',
            title: 'Sports & Statistics',
            content: `
                <h2>Sports &amp; Statistics</h2>

                <div class="env-block intuition">
                    <div class="env-title">Numbers Behind the Game</div>
                    <div class="env-body">
                        <p>Sports are packed with numbers. Batting averages, free-throw percentages, win-loss ratios, and goal-scoring rates all use fractions, decimals, and percents. If you understand these, you can read stats like a pro commentator!</p>
                    </div>
                </div>

                <h3>Batting Average</h3>

                <p>In baseball/cricket, a batting average is:</p>
                <p style="text-align:center; font-size:1.1em;">\\(\\text{Average} = \\dfrac{\\text{Hits}}{\\text{At-Bats}}\\)</p>

                <div class="env-block example">
                    <div class="env-title">Reading a Batting Average</div>
                    <div class="env-body">
                        <p>A player has 45 hits in 150 at-bats.</p>
                        <p style="text-align:center;">\\(\\dfrac{45}{150} = 0.300\\)</p>
                        <p>We say the player is "batting .300" (read: "three hundred"). As a fraction, that is \\(\\dfrac{3}{10}\\), and as a percent, <strong>30%</strong> of the time the player gets a hit.</p>
                    </div>
                </div>

                <h3>Win Percentage</h3>

                <p>A team's win percentage works the same way:</p>
                <p style="text-align:center;">\\(\\text{Win}\\% = \\dfrac{\\text{Wins}}{\\text{Total Games}} \\times 100\\)</p>

                <div class="env-block example">
                    <div class="env-title">Season Record</div>
                    <div class="env-body">
                        <p>A basketball team wins 18 out of 24 games.</p>
                        <p style="text-align:center;">\\(\\dfrac{18}{24} = 0.75 = 75\\%\\)</p>
                        <p>That is a <strong>75% win rate</strong>, or \\(\\dfrac{3}{4}\\) of their games won!</p>
                    </div>
                </div>

                <h3>Free-Throw Percentage</h3>

                <p>A basketball player makes 84 out of 100 free throws. That is an 84% free-throw rate, or \\(\\dfrac{84}{100} = \\dfrac{21}{25}\\) as a simplified fraction.</p>

                <div class="viz-placeholder" data-viz="ch11-sports-viz"></div>

                <div class="env-block remark">
                    <div class="env-title">Think Like an Analyst</div>
                    <div class="env-body">
                        <p>Statistics help coaches make decisions. If a player has a 90% free-throw rate vs another with 60%, you know who to pass to in the final seconds! Fractions, decimals, and percents are the language of sports analytics.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'ch11-sports-viz',
                    title: 'Sports Stats Dashboard',
                    description: 'Set a player\'s hits and at-bats to see the batting average as a fraction, decimal, and percent!',
                    setup: function(container, controls) {
                        var viz = new VizEngine(container, {width: 560, height: 320, scale: 1, originX: 0, originY: 0});
                        var ctx = viz.ctx;
                        var hits = 45, atBats = 150;

                        VizEngine.createSlider(controls, 'Hits', 0, 100, hits, 1, function(v) { hits = Math.round(v); if (hits > atBats) atBats = hits; draw(); });
                        VizEngine.createSlider(controls, 'At-Bats', 1, 200, atBats, 1, function(v) { atBats = Math.round(v); if (hits > atBats) hits = atBats; draw(); });

                        function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

                        function draw() {
                            viz.clear();
                            var avg = atBats > 0 ? hits / atBats : 0;
                            var pct = avg * 100;
                            var g = gcd(hits, atBats);
                            var sNum = hits / (g || 1), sDen = atBats / (g || 1);
                            // Title
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('Player Stats Dashboard', 280, 30);
                            // Three stat cards
                            var cardW = 140, cardH = 80, gap = 20;
                            var startX = 280 - (3 * cardW + 2 * gap) / 2;
                            var cardY = 50;
                            var labels = ['Fraction', 'Decimal', 'Percent'];
                            var values = [sNum + '/' + sDen, '.' + (avg * 1000).toFixed(0).padStart(3, '0'), pct.toFixed(1) + '%'];
                            var cardColors = [viz.colors.blue, viz.colors.orange, viz.colors.green];
                            for (var i = 0; i < 3; i++) {
                                var cx = startX + i * (cardW + gap);
                                ctx.fillStyle = '#1a1a40';
                                ctx.strokeStyle = cardColors[i];
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.roundRect(cx, cardY, cardW, cardH, 8); ctx.fill(); ctx.stroke();
                                ctx.fillStyle = cardColors[i];
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(labels[i], cx + cardW / 2, cardY + 18);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 22px -apple-system,sans-serif';
                                ctx.fillText(values[i], cx + cardW / 2, cardY + 55);
                            }
                            // Visual: hit/miss dots
                            var dotY = 160, dotR = 6, dotGap = 3;
                            var dotsPerRow = 25;
                            var showDots = Math.min(atBats, 100);
                            var showHits = Math.round(avg * showDots);
                            var totalW = dotsPerRow * (dotR * 2 + dotGap);
                            var dotStartX = 280 - totalW / 2;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText(hits + ' hits out of ' + atBats + ' at-bats' + (atBats > 100 ? '  (showing 100)' : ''), 280, dotY - 8);
                            for (var d = 0; d < showDots; d++) {
                                var row = Math.floor(d / dotsPerRow);
                                var col = d % dotsPerRow;
                                var dx = dotStartX + col * (dotR * 2 + dotGap) + dotR;
                                var dy = dotY + 10 + row * (dotR * 2 + dotGap) + dotR;
                                ctx.fillStyle = d < showHits ? viz.colors.green : viz.colors.red + '55';
                                ctx.beginPath(); ctx.arc(dx, dy, dotR, 0, Math.PI * 2); ctx.fill();
                            }
                            // Rating
                            var ratingY = dotY + 10 + (Math.ceil(showDots / dotsPerRow)) * (dotR * 2 + dotGap) + 20;
                            ctx.textAlign = 'center';
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            var rating;
                            if (avg >= 0.300) { rating = 'All-Star!'; ctx.fillStyle = viz.colors.yellow; }
                            else if (avg >= 0.250) { rating = 'Solid player'; ctx.fillStyle = viz.colors.green; }
                            else if (avg >= 0.200) { rating = 'Average'; ctx.fillStyle = viz.colors.blue; }
                            else { rating = 'Needs practice'; ctx.fillStyle = viz.colors.orange; }
                            ctx.fillText(rating, 280, ratingY);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A soccer player scores 12 goals in 40 shots. What is the scoring percentage?',
                    hint: 'Divide goals by shots, then multiply by 100.',
                    solution: '\\(12 \\div 40 = 0.30\\). That is <strong>30%</strong>.'
                },
                {
                    question: 'A tennis player wins 36 out of 48 matches. Express the win rate as a simplified fraction, a decimal, and a percent.',
                    hint: 'GCF of 36 and 48 is 12. Divide: \\(36 \\div 48 = 0.75\\).',
                    solution: 'Fraction: \\(\\dfrac{36}{48} = \\dfrac{3}{4}\\). Decimal: \\(0.75\\). Percent: <strong>75%</strong>.'
                },
                {
                    question: 'Player A: 28 hits in 100 at-bats. Player B: 21 hits in 60 at-bats. Who has the higher batting average?',
                    hint: 'Compute each average: \\(28/100\\) vs \\(21/60\\).',
                    solution: 'Player A: \\(28/100 = 0.280\\). Player B: \\(21/60 = 0.350\\). <strong>Player B</strong> has the higher average!'
                }
            ]
        }
    ]
});
