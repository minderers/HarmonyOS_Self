/*
 * Copyright (c) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Route {
  title: ResourceStr;
  to: string;
};

export const ROUTES: Route[] = [
  {
    title: $r('app.string.title_navigation_transition'),
    to: 'NavigationTransition'
  },
  {
    title: $r('app.string.title_custom_transition'),
    to: 'CustomNavigationTransition'
  },
  {
    title: $r('app.string.title_component_transition'),
    to: 'ComponentTransition'
  },
  {
    title: $r('app.string.title_modal_transition'),
    to: 'ModalTransition'
  },
  {
    title: $r('app.string.title_share_item'),
    to: 'GeometryTransition'
  },
  {
    title: $r('app.string.title_long_take_transition'),
    to: 'LongTakeTransition'
  }
];


/**
 * Share transition id.
 */
export const GEOMETRY_TRANSITION_ID: string = 'shareId';
