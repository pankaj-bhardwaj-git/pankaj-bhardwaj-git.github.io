import React from 'react';
import './MainBoard.css';
import backlogIcon from '../../assets/Backlog.svg';
import todoIcon from '../../assets/To-do.svg';
import inProgressIcon from '../../assets/in-progress.svg';
import doneIcon from '../../assets/Done.svg';
import canceledIcon from '../../assets/Cancelled.svg';
import noPriorityIcon from '../../assets/No-priority.svg';
import lowPriorityIcon from '../../assets/Img - Low Priority.svg';
import mediumPriorityIcon from '../../assets/Img - Medium Priority.svg';
import highPriorityIcon from '../../assets/Img - High Priority.svg';
import urgentPriorityIcon from '../../assets/SVG - Urgent Priority grey.svg';
import addIcon from '../../assets/add.svg';
import threeDotMenuIcon from '../../assets/3 dot menu.svg';

export const MainBoard = ({ groupedData, grouping, userData }) => {
  const priorityOrder = [
    { title: 'no priority', display: 'No Priority', icon: noPriorityIcon },
    { title: 'low', display: 'Low', icon: lowPriorityIcon },
    { title: 'medium', display: 'Medium', icon: mediumPriorityIcon },
    { title: 'high', display: 'High', icon: highPriorityIcon },
    { title: 'urgent', display: 'Urgent', icon: urgentPriorityIcon },
  ];

  const statusOrder = [
    { title: 'Backlog', icon: backlogIcon },
    { title: 'Todo', icon: todoIcon },
    { title: 'In progress', icon: inProgressIcon },
    { title: 'Done', icon: doneIcon },
    { title: 'Canceled', icon: canceledIcon },
  ];

  const keys =
    grouping === 'status'
      ? statusOrder
      : grouping === 'priority'
      ? priorityOrder
      : Object.keys(groupedData);

  console.log('Grouped Data:', groupedData); // Debug logs
  console.log('Keys:', keys);

  const getUserInitials = (name) =>
    name
      ? name
          .split(' ')
          .map((part) => part[0]?.toUpperCase())
          .join('')
      : '';

  return (
    <div className="mainboard-grid">
      {keys.map((key) => {
        const title =
          grouping === 'userId' && userData[key]
            ? userData[key].name
            : key.title || key.display || key;
        const icon = key.icon;

        return (
          <div className="mainboard-column" key={title}>
            <div className="mainboard-column-header">
            {icon && <img src={icon} alt={title} className="mainboard-status-icon" />}
              <h2 className="mainboard-column-title">
                {title}{' '}
                <span className="mainboard-task-count">
                  {groupedData[key.title || key]?.length || 0}
                </span>
              </h2>
              <div className="mainboard-column-actions">
                <img src={addIcon} alt="Add" className="mainboard-add-icon" />
                <img
                  src={threeDotMenuIcon}
                  alt="Menu"
                  className="mainboard-menu-icon"
                />
              </div>
            </div>
            <div className="mainboard-tickets">
              {groupedData[key.title || key]?.map((ticket) => (
                <div className="mainboard-card" key={ticket.id}>
                    <strong>{ticket.id}</strong>
                  <h3 className="mainboard-card-title">{ticket.title}</h3>
                  <div className="mainboard-card-footer">
                    <span className="mainboard-card-tag">
                      {ticket.tag.join(', ')}
                    </span>
                    {userData[ticket.userId] && (
                      <div className="mainboard-user-avatar">
                        {getUserInitials(userData[ticket.userId].name)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
