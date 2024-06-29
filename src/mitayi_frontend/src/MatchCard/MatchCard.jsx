import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import car from './Assets/car.jpg';
import ball from './Assets/ball.avif';
import cat from './Assets/cat.jpg';
import bird from './Assets/bird.webp';
import dog from './Assets/dog.jpeg';
import hiddenImage from './Assets/question.avif'; // Your hidden card image

const cardImages = [
  { name: 'car1', src: car },
  { name: 'car2', src: car },
  { name: 'ball1', src: ball },
  { name: 'ball2', src: ball },
  { name: 'cat1', src: cat },
  { name: 'cat2', src: cat },
  { name: 'dog1', src: dog },
  { name: 'dog2', src: dog },
  { name: 'bird1', src: bird },
  { name: 'bird2', src: bird }
];

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, lightblue, lightpink);
  height: 100vh;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  margin-top: 20px;
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  perspective: 1000px;
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
    &:hover {
      transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(10deg)')};
    }
  }
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 10px; /* Adding border-radius */
  }
  .card-front {
    transform: rotateY(180deg);
  }
  .card-back {
    background-color: #ccc;
    background-image: url(${hiddenImage});
    background-size: cover;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #1D4ED8;
  color: white;
  border: none;
  border-radius: 25px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  z-index: 10;
`;

const getLuckMessage = (score) => {
  if (score === 0) return 'Poor luck!';
  if (score === 1) return 'Good luck!';
  if (score === 2) return 'Better luck!';
  if (score >= 3) return 'Very lucky!';
};

const MatchCard = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = cardImages
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setCards(shuffledCards.slice(0, 9)); 
    setFlipped([]);
    setMatched([]);
    setDisabled(false);
    setScore(0);
    setGameOver(false);
  };

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setTimeout(() => {
        checkMatch(newFlipped);
      }, 1000);
    }
  };

  const checkMatch = (newFlipped) => {
    const [index1, index2] = newFlipped;
    if (cards[index1].name.slice(0, -1) === cards[index2].name.slice(0, -1)) {
      setMatched([...matched, index1, index2]);
      setScore(score + 1);
    } else {
      setGameOver(true);
    }
    setFlipped([]);
    setDisabled(false);
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Test Your Luck</h1>
      <p className="text-xl mb-4">Score: {score}</p>
      <Grid>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            flipped={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={card.src} alt="card" style={{ borderRadius: '10px' }} />
              </div>
              <div className="card-back"></div>
            </div>
          </Card>
        ))}
      </Grid>
      {gameOver && (
        <Overlay>
          <div className='flex items-center justify-center flex-col'>
            <h2 className="text-3xl font-bold text-red-500 ">Game Over!</h2>
            <p className='mb-32'>{getLuckMessage(score)}</p>
          <Button onClick={shuffleCards}>Reset Game</Button>
          </div>
        </Overlay>
      )}
    </Container>
  );
};

export default MatchCard;
