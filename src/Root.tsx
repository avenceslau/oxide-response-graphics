import {Composition} from 'remotion';
import {CombinatorialMagnetron} from './compositions/CombinatorialMagnetron';
import {ConventionalOxides} from './compositions/ConventionalOxides';
import {HighThroughputScreening} from './compositions/HighThroughputScreening';
import {OxideWorkflow} from './compositions/OxideWorkflow';
import {SelectiveResponse} from './compositions/SelectiveResponse';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ConventionalOxides"
        component={ConventionalOxides}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="CombinatorialMagnetron"
        component={CombinatorialMagnetron}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="HighThroughputScreening"
        component={HighThroughputScreening}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="SelectiveResponse"
        component={SelectiveResponse}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="OxideWorkflow"
        component={OxideWorkflow}
        durationInFrames={1}
        fps={30}
        width={2400}
        height={650}
      />
    </>
  );
};
