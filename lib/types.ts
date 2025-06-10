export type BackgroundSettings = {
    color?: RGB;
    image?: string;
    gradient?: {
        startColor: RGB;
        endColor: RGB;
        direction?: 'vertical' | 'horizontal' | 'diagonal';
    };
};

export type ViewportSettings = {
    fov: number;  // Field of view
    near: number; // Near clipping plane
    far: number;  // Far clipping plane
    aspectRatio?: number;
};

export type LightingSettings = {
    ambient?: {
        color: RGB;
        intensity: number;
    };
    directional?: {
        color: RGB;
        intensity: number;
        position: Point3D;
    }[];
    shadows?: boolean;
};

export type SceneSettings = {
    background: BackgroundSettings;
    viewport: ViewportSettings;
    lighting: LightingSettings;
    antialias?: boolean;
    renderQuality?: 'low' | 'medium' | 'high';
};

export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export interface Rotation3D {
    rx: number;
    ry: number;
    rz: number;
}

export interface Scale3D {
    sx: number;
    sy: number;
    sz: number;
}

export interface Transform3D {
    position: Point3D;
    rotation: Rotation3D;
    scale: Scale3D;
}

export type RGB = {
    r: number;
    g: number;
    b: number;
};

export type MaterialProperties = {
    color: RGB;
    opacity?: number;
    wireframe?: boolean;
};
