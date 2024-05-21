const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    const data = req.body;

    const totalStrikePercentage = (data.total_strikes / data.total_pitches) * 100;
    const fastballStrikePercentage = (data.fastball_strikes / data.total_fastballs) * 100;
    const curveballStrikePercentage = (data.curveball_strikes / data.total_curveballs) * 100;
    const changeupStrikePercentage = (data.changeup_strikes / data.total_changeups) * 100;
    const whip = (data.hits + data.walks) / data.innings_pitched;
    const kPerSeven = data.strikeouts / data.innings_pitched * 7;
    const baa = data.hits / data.batters_faced;
    const firstPitchStrikePercentage = (data.first_pitch_strikes / data.batters_faced) * 100;

    const goals = {
        firstPitchStrikePercentage: firstPitchStrikePercentage >= 70,
        totalStrikePercentage: totalStrikePercentage >= 65,
        fastballStrikePercentage: fastballStrikePercentage >= 60,
        curveballStrikePercentage: curveballStrikePercentage >= 65,
    };

    const goalsAchieved = Object.keys(goals).filter(key => goals[key]);
    const totalGoalsMet = `${goalsAchieved.length}/4`;

    let grade = 'F';
    if (goalsAchieved.length === 4) grade = 'A';
    else if (goalsAchieved.length === 3) grade = 'B';
    else if (goalsAchieved.length === 2) grade = 'C';
    else if (goalsAchieved.length === 1) grade = 'D';

    res.json({
        results: {
            totalStrikePercentage: parseFloat(totalStrikePercentage.toFixed(2)),
            fastballStrikePercentage: parseFloat(fastballStrikePercentage.toFixed(2)),
            curveballStrikePercentage: parseFloat(curveballStrikePercentage.toFixed(2)),
            changeupStrikePercentage: parseFloat(changeupStrikePercentage.toFixed(2)),
            whip: parseFloat(whip.toFixed(2)),
            kPerSeven: parseFloat(kPerSeven.toFixed(2)),
            baa: parseFloat(baa.toFixed(3)),
            firstPitchStrikePercentage: parseFloat(firstPitchStrikePercentage.toFixed(2)),
        },
        goalsSummary: {
            totalGoalsMet,
            goalsAchieved: goalsAchieved.map(goal => goal.replace(/([A-Z])/g, ' $1').trim())
        },
        grade
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
