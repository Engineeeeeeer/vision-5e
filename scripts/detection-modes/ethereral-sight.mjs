import DetectionMode from "./base.mjs";
import { DETECTION_LEVELS } from "../const.mjs";

const { Token } = foundry.canvas.placeables;

/**
 * The detection mode for Ethereal Sight.
 */
export default class DetectionModeEtherealSight extends DetectionMode {
    constructor() {
        super({
            id: "etherealSight",
            label: "VISION5E.EtherealSight",
            type: DetectionMode.DETECTION_TYPES.OTHER,
            walls: false,
            angle: false,
            sort: 1,
        });
    }

    /** @override */
    static getDetectionFilter() {
        return this._detectionFilter ??= CONFIG.Canvas.detectionModes.seeInvisibility.constructor.getDetectionFilter();
    }

    /** @override */
    _canDetect(visionSource, target) {
        // Only ethereal tokens can be detected
        return !visionSource.object.document.hasStatusEffect(CONFIG.specialStatusEffects.DEFEATED)
            && target instanceof Token
            && target.document.hasStatusEffect(CONFIG.specialStatusEffects.ETHEREAL);
    }

    /** @override */
    _testPoint(visionSource, mode, target, test) {
        return super._testPoint(visionSource, mode, target, test)
    }
}
