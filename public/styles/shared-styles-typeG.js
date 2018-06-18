const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shared-styles-typeG">
    <template>
        <style include="shared-styles-dropdown">
            article {
                width: var(--app-type-gain-width);
                margin-top: var(--app-type-gain-margin-top);
                display: var(--app-type-gain-display);
                margin-bottom: 1%;
                border-radius: var(--app-standart-border-radius);
                padding: var(--app-standart-border-radius);
                background-color: var(--app-primary-background-color);
                box-shadow: var(--app-type-gain-box-shadow);
            }

            article button {
                width: var(--app-primary-close-button-width);
                cursor: var(--app-primary-close-button-cursor);
                border: var(--app-primary-close-button-border);
                border-radius: var(--app-primary-close-button-radius);
                padding-bottom: var(--app-primary-close-button-padding-bottom);
                color: var(--app-color);
                background-color: var(--app-primary-background-color);
                box-shadow: var(--app-primary-close-button-box-shadow);
                float: var(--app-primary-close-button-float);
            }

            article label[for=range] {
                color: var(--app-color);
                text-shadow: var(--app-type-gain-text-shadow);
                font-family: var(--app-type-gain-font-family);
                font-size: var(--app-type-gain-font-size);
                margin-bottom: var(--app-standart-border-radius);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            paper-button,
            paper-input {
                color: var(--app-color);
                font-weight: var(--app-type-gain-font-weight);
            }

            article input[type=number] {
                margin-top: 5px;
                color: var(--app-input-color);
                background-color: var(--app-input-backgroundColor);
                padding: var(--app-standart-border-radius);
                border-radius: var(--app-standart-border-radius);
            }

            .open {
                display: none
            }

            .divtitle-area {
                display: none
            }

            .open[open] input {
                width: 100px;
                border: 0;
                border-radius: var(--app-standart-border-radius);
                box-shadow: var(--app-type-gain-box-shadow2);
                padding-left: 5px;
            }

            .open[open] {
                display: block;
                width: 155px;
                height: 47px;
                margin-top: 7px;
            }

            .divtitle-area[open] {
                height: 102px;
                font-size: 12px;
            }

            .show {
                display: none
            }

            .show[show] {
                display: block;
            }

            paper-button {
                color: var(--app-color);
                font-weight: var(--app-type-gain-font-weight);
            }

            paper-input.diferent {
                --paper-input-container-label: {
                    color: var(--app-color);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                ;
                --paper-input-container-input: {
                    color: var(--app-color);
                }
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
