interface Dimension {
  width: number;
  height: number;
}

interface ModuleConfig {
  name: string;
  description: string;
  dimensions: Dimension;
  arEnabled: boolean;
  vrEnabled: boolean;
}

interface SceneObject {
  id: string;
  type: 'plane' | 'cube' | 'sphere';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

interface ARVRModule {
  id: string;
  name: string;
  description: string;
  sceneObjects: SceneObject[];
  cameraView: 'AR' | 'VR';
}

class ARVRModuleGenerator {
  private config: ModuleConfig;

  constructor(config: ModuleConfig) {
    this.config = config;
  }

  generateModule(): ARVRModule {
    const module: ARVRModule = {
      id: `module-${this.config.name}`,
      name: this.config.name,
      description: this.config.description,
      sceneObjects: [],
      cameraView: this.config.arEnabled ? 'AR' : 'VR',
    };

    // Generate scene objects based on dimensions
    if (this.config.dimensions.width > 0 && this.config.dimensions.height > 0) {
      const plane: SceneObject = {
        id: 'plane-1',
        type: 'plane',
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [this.config.dimensions.width, this.config.dimensions.height, 1],
      };
      module.sceneObjects.push(plane);
    }

    return module;
  }
}

export class SUSNCraftARVRModuleGenerator {
  static createModule(config: ModuleConfig): ARVRModule {
    const generator = new ARVRModuleGenerator(config);
    return generator.generateModule();
  }
}