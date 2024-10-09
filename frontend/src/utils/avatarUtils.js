import * as AvatarCollection from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

/**
 * Generates an avatar SVG string.
 *
 * @param {string} styleName - The name of the avatar style.
 * @param {string} seed - The seed for the avatar.
 * @param {object} [options={}] - Additional options for the avatar.
 * @returns {string} - The avatar SVG string.
 */
export const generateAvatarSvg = (styleName, seed, options = {}) => {
  const style = AvatarCollection[styleName];
  if (!style) {
    console.error(`Avatar style "${styleName}" not found.`);
    return '';
  }
  const avatar = createAvatar(style, { seed, ...options });
  return avatar.toString();
};

/**
 * Returns the available avatar styles.
 *
 * @returns {string[]} - An array of available style names.
 */
export const getAvailableStyles = () => {
  return Object.keys(AvatarCollection);
};