const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
    <style is="shared-variables">
        html {
            --app-primary-background-color: #5a6565;
            --app-inside-area-background-color: #5b6565;
            --app-secondary-background-color: #464f4f;
            --app-main-area-background-color: #47484b;
            --app-toolbar-background-color: #404444;
            --app-analizer-background-color: #3e4242;
            --app-analizer-background-dropdown-color: #444e4e;
            --app-type-dropdown-listbox-background: #fafafa;
            --app-type-dropdown-focus-background: #b6b6b6b3;
            --app-type-labelforvol-Ready-background-color: #313335;
            --app-type-waiting-background-color: #315182;
            --app-type-sellected-background-color: #7fff00;
            --app-type-scrollbar-background-color: #4d4848ef;
            --app-type-scrollbar-thunb-background-color: #adafa7d7;
            --app-type-scrollbar-thunb2-background-color: #adafa7d7;
            --app-main-area-background-color: #485050;
            /*shadows*/
            --app-toolbar-box-shadow: 2px 2px 3px #81838375;
            --app-type-gain-box-shadow: 3px 3px 10px #382c2c;
            --app-type-gain-box-shadow2: 2px 2px 2px #a9a1a1;
            --app-type-sroll-box-shadow: 1px 1px 1px #000000;
            --app-primary-close-button-box-shadow: 1px 1px 1px #3c3d3f;
            --app-type-labelforvol-text-shadow: 2px 2px 1px #1f1f1b;
            --app-type-dropdown-text-shadow: 2px 1px 1px #0c0c0b;
            --app-type-gain-text-shadow: 2px 2px 1px #949489;
            --app-analizer-shadow: 1px 1px 4px #717171;
            --app-buttonArea-shadow: 2px 2px 7px #292828;
            --app-main-area-box-shadow: 2px 2px 5px #000000;
            /*colors*/
            --app-color: #f2f4e6;
            --app-color-2: #f1f4e5;
            --app-color-3: #ff0000;
            --app-title: rgb(0, 206, 209);
            --app-progress-color: rgb(58, 210, 236);
            --app-secondary-close-button-color: #a9a1a1;
            --app-type-labelforvol-color: #ffffff;
            /**/
            --app-type-gain-font-weight: 600;
            --app-type-labelforvol-font-size: 10px;
            --app-type-span-font-size: 10px;
            --app-type-button-font-size: 12px;
            --app-type-gain-font-size: 21px;
            --app-type-gain-font-family: 'NotoColorEmoji';
            --app-primary-close-button-cursor: pointer;
            /**/
            --app-standart-border-radius: 4px;
            --app-primary-close-button-radius: 10px;
            /**/
            --app-primary-close-button-padding-bottom: 3px;
            /**/
            --app-primary-close-button-float: right;
            /**/
            --app-type-gain-width: 170px;
            --app-type-sroll-width: 16px;
            --app-primary-close-button-width: 23px;
            --app-type-sroll-height: 16px;
            /**/
            --app-type-gain-margin-top: 1%;
            --app-type-sroll-margin-top: -4px;
            /**/
            --app-type-gain-display: grid;
            
            /**/
            --app-type-sroll-border: 1px solid #6a7dd1;
            --app-type-sroll-track-border: 0.2px solid #596980;
            --app-primary-close-button-border: 0;
            /**/
        }
    </style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
