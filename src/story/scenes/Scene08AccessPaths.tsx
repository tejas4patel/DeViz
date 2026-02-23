/**
 * Scene 08: Access Paths for Researchers
 *
 * Side-by-side serpentine paths comparing the Public Use Data File
 * and Restricted Use (RDC) access routes for NAMCS HC data.
 */

import { SerpentinePath } from '../components/SerpentinePath';
import type { AccessPath } from '../components/SerpentinePath';
import accessPathsRaw from '../data/scene08-access-paths.json';
import './Scene08AccessPaths.css';

const accessPaths = accessPathsRaw as AccessPath[];

export default function Scene08AccessPaths() {
  return (
    <div className="scene08-access-paths">
      <div className="scene08-access-paths__container">
        <h2 className="scene08-access-paths__title">Access Paths for Researchers</h2>
        <div className="serpentine-sections">
          <div className="path-section public-section">
            <SerpentinePath path={accessPaths[0]} title="PUBLIC USE DATA FILE" />
          </div>
          <div className="path-section rdc-section">
            <SerpentinePath path={accessPaths[1]} title="RESTRICTED USE DATA (RDC)" />
          </div>
        </div>
        <div className="scene08-access-paths__decision-help">
          <h3>Which Path is Right for You?</h3>
          <div className="scene08-access-paths__recommendations">
            {accessPaths.map(path => (
              <div key={path.id} className="scene08-access-paths__recommendation">
                <div className="path-summary" style={{ borderColor: path.color }}>
                  <h4 style={{ color: path.color }}>{path.title}</h4>
                  <div className="benefits-limitations">
                    <div className="benefits">
                      <strong>Benefits:</strong>
                      <ul>
                        {path.benefits?.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                    <div className="limitations">
                      <strong>Limitations:</strong>
                      <ul>
                        {path.limitations?.map((l, i) => <li key={i}>{l}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
