/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/


import React, { useEffect, useState } from "react";

import Initializer from "../services/Initializer";
import { ItwinViewerCommonParams } from "../types";
import IModelLoader from "./iModel/IModelLoader";

export interface ViewerProps extends ItwinViewerCommonParams {
  contextId?: string;
  iModelId?: string;
  changeSetId?: string;
  snapshotPath?: string;
}

export const Viewer: React.FC<ViewerProps> = ({
  
  extensions,
  appInsightsKey,
  backend,
  productId,
  theme,
  changeSetId,
  defaultUiConfig,
  imjsAppInsightsKey,
  onIModelConnected,
  i18nUrlTemplate,
  snapshotPath,
  desktopApp,
  frontstages,
  backstageItems,
  onIModelAppInit,
  uiFrameworkVersion,
  viewportOptions,
  additionalI18nNamespaces,
  additionalRpcInterfaces,
  uiProviders,
  toolAdmin,
}: ViewerProps) => {
  const [iModelJsInitialized, setIModelJsInitialized] = useState<boolean>(
    false
  );
  useEffect(() => {
    if (!iModelJsInitialized) {
      
      Initializer.initialize(
      )
        .then(() => {
          Initializer.initialized
            .then(() => setIModelJsInitialized(true))
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          throw error;
        });
    }
  });

  return iModelJsInitialized ? (
   
      <IModelLoader
        defaultUiConfig={defaultUiConfig}
        onIModelConnected={onIModelConnected}
        snapshotPath={snapshotPath}
        frontstages={frontstages}
        backstageItems={backstageItems}
        uiFrameworkVersion={uiFrameworkVersion}
        viewportOptions={viewportOptions}
        uiProviders={uiProviders}
        theme={theme}
        extensions={extensions}
      />
   
  ) : null;
};
