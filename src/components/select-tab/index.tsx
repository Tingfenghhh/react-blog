import { useState } from 'react';
import { initialTabs as tabs } from './ingredients';
import { motion, AnimatePresence } from 'framer-motion';
import { Windows } from './components/style';
import './index.less';

function SelectTab() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <>
      <Windows>
        <nav>
          <ul>
            {tabs.map((item) => (
              <li
                key={item.label}
                className={item === selectedTab ? 'selected' : ''}
                onClick={() => setSelectedTab(item)}
              >
                {`${item.icon} ${item.label}`}
                {item === selectedTab ? (
                  <motion.div className='underline' layoutId='underline' />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <main>
          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedTab ? selectedTab.label : 'empty'}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedTab ? selectedTab.icon : '😋'}
            </motion.div>
          </AnimatePresence>
        </main>
      </Windows>
    </>
  );
}

export default SelectTab;
