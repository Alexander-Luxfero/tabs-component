/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  const end = {
    likes: 0,
    summary: "Last page, and it's nothing to do here",
    details:
      "Last tabe, last oportunity, to scize everething you ever wanted, in one moment. Would you capture, or make it slep?",
  };

  return (
    <div>
      <div className="tabs">
        {content.map((tab, index) => (
          <Tab
            key={index}
            num={index}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
        <Tab
          num={content.length}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {activeTab < content.length ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <TabContent item={end} key={end.summary} />
      )}
    </div>
  );
}

function Tab({ num, activeTab, setActiveTab }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => setActiveTab(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  function handleUndo() {
    setShowDetails(false);
    setLikes(0);
  }

  function handleUndoTwo() {
    const time = 2000;
    setTimeout(handleUndo, time);
  }

  return !item ? (
    <div className="tab-content">
      <h4>I&apos;m a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  ) : (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoTwo}>Undo in 2s</button>
      </div>
    </div>
  );
}
