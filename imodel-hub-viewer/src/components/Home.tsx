/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Environment, IModelApp, IModelConnection, ScreenViewport, SkyGradient, ViewState3d } from "@bentley/imodeljs-frontend";
import { IModelBackendOptions, Viewer } from "../viewer/index";
//import { IModelBackendOptions, Viewer } from "@bentley/itwin-viewer-react";
import { ColorTheme } from "@bentley/ui-framework";
import React, { useEffect, useState } from "react";
import { RenderMode } from "@bentley/imodeljs-common";
import { ErrorBoundary } from "./ErrorBoundary/ErrorBoundary";
export const AuthClientHome: React.FC = () => {

  const testBackend: IModelBackendOptions = {
    customBackend: {
      rpcParams: { info: { title: "viewerapp", version: "v2.0" }, uriPrefix: "http://localhost:34001" }
    },
  }
  const test = async (imodel: IModelConnection) => {
    IModelApp.viewManager.onViewOpen.addOnce((vp: any) => {
      vp.displayStyle.viewFlags.renderMode = RenderMode.SmoothShade;//himanshu
      vp.displayStyle.viewFlags.lighting = true;
      vp.displayStyle.viewFlags.shadows = true;
      //this.viewport.displayStyle.viewFlags.thematicDisplay = false;
      //this.viewport.displayStyle.viewFlags.visibleEdges = false;
      vp.displayStyle.viewFlags.cameraLights = true;
      // this.viewport.displayStyle.viewFlags.clipVolume = true;
      // this.viewport.displayStyle.viewFlags.constructions = true;
      // this.viewport.displayStyle.viewFlags.fill = true;
      // this.viewport.displayStyle.viewFlags.dimensions = true;
      vp.displayStyle.viewFlags.transparency = true; //hides insulation on viewer
      vp.displayStyle.viewFlags.textures = false;
      //sthis.viewport.displayStyle.
      //this.viewport.displayStyle.viewFlags
      if ((vp.view as ViewState3d).getDisplayStyle3d())
        (vp.view as ViewState3d).getDisplayStyle3d().environment = new Environment(
          {
            sky: new SkyGradient({
              display: true
            }).toJSON(),
          });
    });
  }

  return (
    <div className="home">
      <ErrorBoundary>
        <Viewer
          onIModelConnected={test}
          backend={testBackend}
          snapshotPath={" Please put the file path to a local bim file."}
          appInsightsKey={process.env.IMJS_APPLICATION_INSIGHTS_KEY}
          theme={ColorTheme.Light}
          defaultUiConfig={{
            contentManipulationTools: {
              hideDefaultHorizontalItems: false,
              hideDefaultVerticalItems: false,
              cornerItem: {
                hideDefault: false,
              },
            },
            hideDefaultStatusBar: false,
            hidePropertyGrid: false,
            hideTreeView: false,
            hideToolSettings: false,
            navigationTools: {
              hideDefaultHorizontalItems: false,
              hideDefaultVerticalItems: false,
            },
          }}
        />
      )


      {/* {loggedIn && (
        <Viewer 
          authConfig={{ oidcClient: AuthorizationClient.oidcClient }}
          backend={testBackend}
          snapshotPath={"C:\\Projects\\Southfield-BPS_1.BIM"}
          appInsightsKey={process.env.IMJS_APPLICATION_INSIGHTS_KEY}
          theme={ColorTheme.Dark}
          defaultUiConfig={{
            contentManipulationTools: {
              hideDefaultHorizontalItems: true,
              hideDefaultVerticalItems: true,
              cornerItem: {
                hideDefault: true,
              },
            },
            hideDefaultStatusBar: true,
            hidePropertyGrid: true,
            hideTreeView: true,
            hideToolSettings: true,
            navigationTools: {
              hideDefaultHorizontalItems: true,
              hideDefaultVerticalItems: true,
            },
          }}
        />
      )} */}


      </ErrorBoundary>
    </div>
  );
};
