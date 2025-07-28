/**
 * Node type configurations for extensibility
 * Define new node types here to automatically support them throughout the app
 */

import { NodeTypeConfig } from '../types';

export const NODE_TYPES: Record<string, NodeTypeConfig> = {
  text: {
    type: 'text',
    label: 'Text Message',
    defaultData: {
      type: 'text',
      label: 'Text Message',
      message: 'Enter your message here...',
    },
    color: '#3B82F6',
  },
  // Future node types can be added here
  // image: {
  //   type: 'image',
  //   label: 'Image Message',
  //   defaultData: {
  //     type: 'image',
  //     label: 'Image Message',
  //     imageUrl: '',
  //     altText: '',
  //   },
  //   color: '#10B981',
  // },
};