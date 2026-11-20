import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import deploymentTaskGroups, { taskFlagLabels } from '@site/src/data/deploymentTasks';
import styles from './styles.module.css';

function TaskIcon({ icon }) {
  const src = useBaseUrl(`/img/task-icons/${icon}.svg`);
  return (
    <span className={styles.iconTile} aria-hidden="true">
      <img src={src} alt="" loading="lazy" />
    </span>
  );
}

function TaskCard({ task }) {
  const href = useBaseUrl(`/docs/${task.id}`);
  return (
    <Link to={href} className={styles.card}>
      <TaskIcon icon={task.icon} />
      <span className={styles.body}>
        <span className={styles.name}>{task.name}</span>
        <span className={styles.description}>{task.description}</span>
        {task.flags?.length > 0 && (
          <span className={styles.flags}>
            {task.flags.map((flag) => (
              <span key={flag} className={`${styles.flag} ${styles[`flag_${flag}`]}`} title={taskFlagLabels[flag].title}>
                {taskFlagLabels[flag].label}
              </span>
            ))}
          </span>
        )}
      </span>
    </Link>
  );
}

/** Cards for one task group, e.g. <DeploymentTaskGroup group="vaults" /> */
export function DeploymentTaskGroup({ group }) {
  const match = deploymentTaskGroups.find((g) => g.key === group);
  if (!match) {
    throw new Error(`Unknown deployment task group: ${group}`);
  }
  return (
    <div className={styles.grid}>
      {match.tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default DeploymentTaskGroup;
