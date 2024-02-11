import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Rules(){
    const navigate = useNavigate();
    const Rules1 = 'In this game, 3 to 9 players are trying to get the most points by deiceving others. \n The goal is to get the most amount of points to win the game. \n';
    const Rules2 = 'How to Play: \n To start, all players pick vote for a category to choose from. \n Once all votes are in, the category is chosen and a random player is given the role as the Artist and a word to draw while all other players become trickers. \n';
    const Rules3 = 'Drawing and Guessing: \n The Artist draw the word while the trickers come up with a fake answer that other trickers may pick instead. \n Once either the time is up, or when both the tricksters and the artist given their drawing and fake guesses, all the trickers are given the the other fake answers and the real choice. Their job is to find the real answer from the fake answers. \n';
    const Rules4 = 'Scoring: \n Once all trickers voted for the answer they beleive is the true answer, Points are awards for the following criteria: \n Guessing the correct answer gives you 10 pts. \n Guessing a fake answer gives the person that made that answer 15 pts. \n The artist that gets 10 pts if the correct answer is chosen. \n';
    const Rules5 = "Ending: \n Once all points are given, The artist role goes to another player that hasn't went yet and the cycle goes again. \n Once all player have went once, another category is to be voted for and restarts. \n When three categories and all players have went their respective times, the game ends and the winner is choosen with the person with the most points.";
    const RuleArray = [Rules1, Rules2, Rules3, Rules4, Rules5];
    const [activeRule, setActiveRule,] = useState(0);

    function handleClick() {
        navigate(`/`);
    }

    function forwardRules(){
        if (activeRule === RuleArray.length-1){
            setActiveRule(0);
        }
        else
        setActiveRule(activeRule + 1)
    }

    function backwardRules(){
        
        if (activeRule === 0){
            
            setActiveRule(RuleArray.length - 1);
        }
        else{
            setActiveRule(activeRule - 1)
        }
    }
    
    return (
        <div className="bg-[#ece6c2] font-serif h-screen">
            <div className="text-[#6f5643] text-5xl pt-10">Fictionary</div>
            <div className="text-[#6f5643] text-1x1 mb-32">"Fictionary and Fibbage Combined" </div> 
            <div className="rule-text display-linebreak">{RuleArray[activeRule]}</div>
            <div className="space-x-2">
                <button className="fic-button rule-text" onClick={backwardRules}>Back</button>
                <button className="fic-button rule-text" onClick={handleClick} >Return Home</button>
                <button className="fic-button rule-text" onClick={forwardRules}>Next</button>
            </div>
        </div>
    )
}

export default Rules;