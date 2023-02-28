import React, { useState } from 'react';
import './style.css';
import { Button, Modal, Input, Card } from 'antd';

const defaultBoard = [
  {
    id: 1,
    laneName: 'Todo',
    cards: [{name: "UI Task", description: "React UI Task", deadline: "2 days"}],
  },
  {
    id: 2,
    laneName: 'InProgress',
    cards: [],
  },
  {
    id: 3,
    laneName: 'Done',
    cards: [],
  },
];

export default function App() {
  const [board, updateBoard] = useState(defaultBoard);
  const [card, setCard] = useState({});
  const [addCard, toggleAddCard] = useState(false);
  const updateTask = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
  }
  const addNewCard = () => {
    const updatedBoard = board.map(item => {
      if (item.id === 1) {
        return {
          ...item,
          cards: [...item.cards, card]
        }
      } else {
        return { ...item }
      }
    })
    updateBoard(updatedBoard)
    toggleAddCard(false);
  }

  const onDrop = (evt, value, status) => {
    evt.preventDefault();
    let laneId =  evt.target.id;
    console.log("laneId", laneId);
  };

  const onDragLeave = (evt) => {
    // let currentTarget = evt.currentTarget;
    // let newTarget = evt.relatedTarget;
    // if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
    //   return;
    // evt.preventDefault();
    // let element = evt.currentTarget;
    // element.classList.remove("dragged-over");
    evt.preventDefault();
    console.log(evt.target.id);

  };

  return (
    <div>
      <h1 id="header">Trello View</h1>
      <div className="board">
        {board.map((lane) => {
          return (
            <div className="board-column" key={lane.id} id={lane.id} onDrop={onDrop} onDragLeave={(e) => onDragLeave(e)}
            >
              <h3 className="lane-header">{lane.laneName}</h3>
              {
                lane.cards.map((card, index) => {
                  return <Card id={index} key={index} bordered={true} hoverable={true} style={{ margin: "0px 8px 8px 8px" }} draggable>
                    <Card.Meta title={card.name} description={card.description} />
                    <span>{card.deadline}</span>
                  </Card>
                })
              }
            </div>
          );
        })}
      </div>
      <div className="float-btn">
        <Button shape="round" onClick={() => toggleAddCard(true)}>Add Card</Button>
      </div>
      <Modal open={addCard} title="Add Card" onCancel={() => toggleAddCard(false)} onOk={() => addNewCard()}>
        <div>
          <label>Name</label>
          <Input placeholder="Enter task name" name="name" onChange={updateTask} />
        </div>
        <div>
          <label>Description</label>
          <Input placeholder="Enter task Description" name="description" onChange={updateTask} />
        </div>
        <div>
          <label>Deadline</label>
          <Input placeholder="Enter task deadline" name="deadline" onChange={updateTask} />
        </div>
      </Modal>
    </div>
  );
}
