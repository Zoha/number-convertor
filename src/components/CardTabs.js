import TabButton from "./TabButton";

function CardTabs({ tabs, setTabs }) {
  function selectTab(tab) {
    setTabs((tabs) => {
      return tabs.map((t) => {
        t.isActive = false;
        if (tab === t) {
          t.isActive = true;
        }
        return t;
      });
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 pt-14 md:pt-0 gap-4 px-4 ">
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          isActive={tab.isActive}
          onSelect={() => selectTab(tab)}
        >
          {tab.name}{" "}
        </TabButton>
      ))}
    </div>
  );
}

export default CardTabs;
