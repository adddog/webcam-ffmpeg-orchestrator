/***************
    =============
    INTERNAL CONFIG
    =============
***************/

import { isNil } from "lodash"
export const BASE_FONT_PX = 14

/********************
// QUERY RESULTS
*********************/
export const MAX_QUERY_RESULTS = 30
export const TIMECODE_FIELD_WIDTH = 8 * BASE_FONT_PX
export const QUERY_RESULTS_NUM_FIELDS = 3

export const getFieldWidths = totalWidth =>
  totalWidth - TIMECODE_FIELD_WIDTH // [name | timecode | text]

/********************
// SIZING


change index.css for CSS font-sizes

Calcuated from font-size on body (16px)

Pixels  EMs
13px  0.813em
14px  0.875em //BASE
15px  0.938em
16px  1.000em
*********************/


export const stringLengthToPixelWidth = length =>
  length * BASE_FONT_PX

export const pixelWidthToStringLength = length =>
  isNil(length) ? NaN : Math.floor(length / BASE_FONT_PX)

export const approximateNumberWordPadding = textAreaWidth =>
  Math.floor(textAreaWidth / BASE_FONT_PX / 5)
