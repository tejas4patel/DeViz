import './SceneLoader.css';

interface SceneLoaderProps {
  title?: string;
}

export default function SceneLoader({ title }: SceneLoaderProps) {
  return (
    <div className="scene-loader">
      {/* Ambient background orbs */}
      <div className="scene-loader__orb scene-loader__orb--1" />
      <div className="scene-loader__orb scene-loader__orb--2" />
      <div className="scene-loader__orb scene-loader__orb--3" />

      <div className="scene-loader__card">
        {/* Brand */}
        <div className="scene-loader__brand">
          <div className="scene-loader__brand-name">NAMCS HC</div>
          <div className="scene-loader__brand-tag">Health Center Data</div>
        </div>

        {/* Animated bar chart */}
        <div className="scene-loader__bars" role="progressbar" aria-label="Loading">
          <div className="scene-loader__bar" />
          <div className="scene-loader__bar" />
          <div className="scene-loader__bar" />
          <div className="scene-loader__bar" />
          <div className="scene-loader__bar" />
          <div className="scene-loader__bar" />
          <div className="scene-loader__bar" />
        </div>

        {/* Label */}
        <div className="scene-loader__label">
          <div className="scene-loader__title">
            {title ?? 'Loading scene'}
          </div>
          <div className="scene-loader__dots" aria-hidden="true">
            <div className="scene-loader__dot" />
            <div className="scene-loader__dot" />
            <div className="scene-loader__dot" />
          </div>
        </div>
      </div>
    </div>
  );
}
