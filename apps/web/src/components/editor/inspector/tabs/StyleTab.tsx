import React from "react";
import { TextSection, ShapeSection, SVGSection } from "../";
import { InspectorSection } from "../shell/InspectorSection";

export interface StyleTabProps {
  clipId: string;
  showTextSection: boolean;
  showShapeSection: boolean;
  showSVGSection: boolean;
}

export const StyleTab: React.FC<StyleTabProps> = ({
  clipId,
  showTextSection,
  showShapeSection,
  showSVGSection,
}) => {
  return (
    <>
      {/* Open by default: this section holds the text content itself, so a
          collapsed header leaves a new text clip with no visible way to type
          into it. Shape/SVG stay collapsed — their content is not typed. */}
      {showTextSection && (
        <InspectorSection
          title="Text Properties"
          sectionId="text-properties"
          defaultOpen
        >
          <TextSection clipId={clipId} />
        </InspectorSection>
      )}
      {showShapeSection && (
        <InspectorSection title="Shape Properties" sectionId="shape-properties">
          <ShapeSection clipId={clipId} />
        </InspectorSection>
      )}
      {showSVGSection && (
        <InspectorSection title="SVG Properties">
          <SVGSection clipId={clipId} />
        </InspectorSection>
      )}
    </>
  );
};
