/**
 * Scene 07: Data Coverage Matrix
 *
 * Interactive tree showing which data elements are available in
 * restricted use files vs public use files.
 */

import { DataCoverageTree } from '../components/DataCoverageTree';
import type { DataElement } from '../components/DataCoverageTree';
import dataCoverageRaw from '../data/scene07-data-coverage.json';
import './Scene07DataMatrix.css';

const dataCoverage = dataCoverageRaw as DataElement;

export default function Scene07DataMatrix() {
  return (
    <div className="scene07-data-matrix">
      <h2 className="scene07-data-matrix__title">What data exists in each file type?</h2>
      <div className="scene07-data-matrix__container">
        <div className="scene07-data-matrix__main">
          {/* Tree Visualization */}
          <div className="scene07-data-matrix__tree">
            <DataCoverageTree data={dataCoverage} />
          </div>
        </div>

        {/* Legend Sidebar */}
        <div className="scene07-data-matrix__legend">
          <div className="scene07-data-matrix__legend-item">
            <div className="scene07-data-matrix__legend-dot scene07-data-matrix__legend-dot--both"></div>
            <div>
              <div className="scene07-data-matrix__legend-label">Both Files</div>
              <div className="scene07-data-matrix__legend-sublabel">Restricted & Public</div>
            </div>
          </div>
          <div className="scene07-data-matrix__legend-item">
            <div className="scene07-data-matrix__legend-dot scene07-data-matrix__legend-dot--restricted"></div>
            <div>
              <div className="scene07-data-matrix__legend-label">Restricted Only</div>
              <div className="scene07-data-matrix__legend-sublabel">RDC Access</div>
            </div>
          </div>
          <div className="scene07-data-matrix__legend-item">
            <div className="scene07-data-matrix__legend-dot scene07-data-matrix__legend-dot--category"></div>
            <div>
              <div className="scene07-data-matrix__legend-label">Category</div>
              <div className="scene07-data-matrix__legend-sublabel">Click to expand</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
