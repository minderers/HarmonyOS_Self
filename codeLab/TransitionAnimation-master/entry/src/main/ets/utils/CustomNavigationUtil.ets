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

export interface AnimateCallback {
  timeout?: number;
  animation?: (transitionProxy: NavigationTransitionProxy) => void;
}

const customTransitionMap: Map<string, AnimateCallback> = new Map();

export class CustomTransition {
  static delegate = new CustomTransition();
  operation: NavigationOperation = NavigationOperation.PUSH;

  static getInstance() {
    return CustomTransition.delegate;
  }

  /**
   * Register an animation callback for a page
   * name: The unique id of the registration page.
   * animation：Used to set the state of the page when the animation starts.
   * timeout：Timeout period at the end of the transition.
   */
  registerNavParam(
    name: string,
    timeout: number,
    animation?: (transitionProxy: NavigationTransitionProxy) => void
  ): void {
    const params: AnimateCallback = {
      animation,
      timeout
    };
    customTransitionMap.set(name, params);
  }

  unRegisterNavParam(name: string): void {
    customTransitionMap.delete(name);
  }

  getAnimateParam(name: string): AnimateCallback {
    const result: AnimateCallback = {
      timeout: customTransitionMap.get(name)?.timeout,
      animation: customTransitionMap.get(name)?.animation
    };
    return result;
  }
}