import { css } from "@microsoft/fast-element";
import { display, focusVisible } from "@microsoft/fast-foundation";
import {
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFocusBehavior,
    neutralForegroundRestBehavior,
} from "../styles/recipes";
import { heightNumber } from "../styles/size";
import { elevation } from "../styles/elevation";

export const SelectStyles = css`
    ${display("inline-block")}

    :host {
        position: relative;
        width: 250px;
        color: ${neutralForegroundRestBehavior.var};
        --elevation: 14;
    }

    :host([open]) {
        z-index: 10;
    }

    :host(:${focusVisible}) .button {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${
            neutralFocusBehavior.var
        };
        border-color: ${neutralFocusBehavior.var};
    }

    .listbox {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
    }

    .button {
        background: ${neutralFillInputRestBehavior.var};
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid ${accentFillRestBehavior.var};
        height: calc(${heightNumber} * 1px);
        font: inherit;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        padding: calc(var(--design-unit) * 2px + 1px);
        color: ${neutralForegroundRestBehavior.var};
        width: 100%;
        display: flex;
    }

    .button:hover {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${accentFillHoverBehavior.var};
    }

    .button:active {
        background: ${neutralFillInputActiveBehavior.var};
        border-color: ${accentFillActiveBehavior.var};
    }

    :host slot[name="listbox"] {
        display: none;
        width: 100%;
    }

    :host([open]) slot[name="listbox"] {
        display: flex;
        position: absolute;
        ${elevation}
    }

    :host .end {
        margin-inline-start: auto;
    }

    .start,
    .end,
    .indicator svg,
    ::slotted(svg) {
    }

    .start,
    .end,
    .indicator,
    ::slotted(svg) {
        ${`` /* Glyph size is temporary - replace when glyph-size var is added */}
        fill: ${neutralForegroundRestBehavior.var};
        height: 16px;
        width: 16px;
    }

`.withBehaviors(
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    neutralFillInputActiveBehavior,
    neutralFillInputHoverBehavior,
    neutralFillInputRestBehavior,
    neutralFocusBehavior,
    neutralForegroundRestBehavior
);
