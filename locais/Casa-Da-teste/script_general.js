(function(){
var translateObjs = {};
function trans(a, b) {
    var c = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    return translateObjs[c[0x0]] = c, '';
}
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a]);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"id":"rootPlayer","minWidth":20,"backgroundColor":["#000000"],"defaultMenu":["fullscreen","mute","rotation"],"start":"this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.mainPlayList,this.ThumbnailList_5CC606D1_0C8A_F505_41A0_386B38F944F1_playlist]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { if(component.get('class') != 'ViewerArea') component.set('visible', false); }) }","data":{"displayTooltipInTouchScreens":true,"defaultLocale":"pt","textToSpeechConfig":{"speechOnInfoWindow":false,"volume":1,"speechOnTooltip":false,"stopBackgroundAudio":false,"rate":1,"speechOnQuizQuestion":false,"pitch":1},"name":"Player468","history":{},"locales":{"pt":"locale/pt.txt","es":"locale/es.txt"},"initialScale":0.5},"scrollBarColor":"#000000","buttonToggleMute":"this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D","children":["this.MainViewer","this.ThumbnailList_5CC606D1_0C8A_F505_41A0_386B38F944F1","this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E"],"vrPolyfillScale":1,"watermark":false,"buttonToggleFullscreen":"this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0","hash": "e3e911b951f2106f661c7c5f76429685741c70e6bfcc2907c7c62487182145b2", "definitions": [{"id":"panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_camera","enterPointingToHorizon":true,"initialSequence":"this.sequence_EF90B251_FA72_AFCA_41E2_E09D5F1344D1","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"class":"PanoramaCamera"},{"id":"MainViewer","subtitlesBottom":50,"left":0,"playbackBarBorderColor":"#FFFFFF","progressBarBorderSize":0,"toolTipPaddingLeft":6,"progressBarBorderRadius":0,"progressBorderSize":0,"playbackBarProgressBorderColor":"#000000","data":{"name":"Main Viewer"},"subtitlesTop":0,"playbackBarBorderRadius":0,"toolTipFontColor":"#606060","playbackBarBackgroundOpacity":1,"toolTipPaddingRight":6,"vrPointerSelectionColor":"#FF00CC","progressBorderRadius":0,"playbackBarHeadBorderRadius":0,"playbackBarHeadBorderColor":"#000000","subtitlesTextShadowColor":"#000000","progressLeft":0,"vrPointerSelectionTime":2000,"subtitlesFontSize":"3vmin","playbackBarBorderSize":0,"subtitlesBackgroundOpacity":0.2,"surfaceReticleColor":"#FFFFFF","firstTransitionDuration":0,"toolTipShadowColor":"#333333","subtitlesBorderColor":"#FFFFFF","width":"100%","playbackBarHeadShadowBlurRadius":3,"height":"100%","playbackBarHeadHeight":15,"playbackBarLeft":0,"playbackBarHeadShadowColor":"#000000","surfaceReticleSelectionColor":"#FFFFFF","playbackBarHeadBackgroundColorRatios":[0,1],"subtitlesTextShadowVerticalLength":1,"subtitlesFontFamily":"Arial","playbackBarHeadBorderSize":0,"toolTipPaddingBottom":4,"minHeight":50,"playbackBarHeadShadow":true,"minWidth":100,"subtitlesGap":0,"subtitlesTextShadowHorizontalLength":1,"playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarBottom":5,"toolTipBorderColor":"#767676","subtitlesBackgroundColor":"#000000","toolTipTextShadowColor":"#000000","progressBackgroundColorRatios":[0.00784313725490196],"toolTipBackgroundColor":"#F6F6F6","progressRight":0,"playbackBarBackgroundColor":["#FFFFFF"],"top":0,"playbackBarHeight":10,"progressBarBorderColor":"#0066FF","progressBarBackgroundColorRatios":[0],"playbackBarHeadWidth":6,"playbackBarProgressBorderSize":0,"playbackBarRight":0,"playbackBarBackgroundColorDirection":"vertical","toolTipFontFamily":"Arial","subtitlesTextShadowOpacity":1,"progressBorderColor":"#FFFFFF","vrPointerColor":"#FFFFFF","playbackBarProgressBorderRadius":0,"playbackBarProgressBackgroundColor":["#3399FF"],"playbackBarHeadShadowOpacity":0.7,"subtitlesFontColor":"#FFFFFF","progressBarBackgroundColor":["#3399FF"],"progressBackgroundColor":["#FFFFFF"],"toolTipPaddingTop":4,"progressBottom":0,"class":"ViewerArea","playbackBarProgressBackgroundColorRatios":[0],"progressHeight":10},{"id":"ThumbnailList_5CC606D1_0C8A_F505_41A0_386B38F944F1","itemPaddingBottom":3,"right":0,"toolTipPaddingLeft":6,"scrollBarColor":"#04A3E1","toolTipFontColor":"#FFFFFF","propagateClick":false,"itemPaddingLeft":3,"itemThumbnailBorderRadius":40,"backgroundOpacity":0,"toolTip":trans('ThumbnailList_5CC606D1_0C8A_F505_41A0_386B38F944F1.toolTip'),"itemPaddingRight":3,"itemThumbnailShadowBlurRadius":4,"data":{"name":"ThumbnailList"},"scrollBarOpacity":0.35,"rollOverItemThumbnailShadowHorizontalLength":4,"itemBackgroundColor":[],"itemPaddingTop":3,"toolTipFontSize":"17px","itemThumbnailOpacity":1,"itemThumbnailShadowColor":"#000000","rollOverItemThumbnailShadow":true,"toolTipShadowColor":"#333333","height":96.2,"itemThumbnailShadowSpread":1,"itemLabelGap":0,"itemThumbnailWidth":70,"layout":"horizontal","selectedItemThumbnailShadowVerticalLength":0,"itemThumbnailScaleMode":"fit_outside","itemThumbnailHeight":70,"itemLabelTextDecoration":"none","toolTipPaddingBottom":4,"playList":"this.ThumbnailList_5CC606D1_0C8A_F505_41A0_386B38F944F1_playlist","maxHeight":800,"itemLabelFontColor":"#CCCCCC","maxWidth":1920,"rollOverItemLabelFontColor":"#00CCCC","selectedItemThumbnailShadowOpacity":1,"minHeight":70,"rollOverItemThumbnailShadowOpacity":0.3,"minWidth":200,"itemLabelFontSize":"14px","itemBorderSize":0,"itemLabelFontWeight":"normal","selectedItemLabelFontColor":"#00FFFF","itemLabelFontFamily":"Oswald Medium","toolTipBorderColor":"#000000","itemBackgroundColorDirection":"vertical","toolTipBackgroundColor":"#9966CC","itemBackgroundOpacity":0,"toolTipTextShadowColor":"#000000","itemBorderColor":"#000000","itemMode":"thumbnail-only","itemVerticalAlign":"top","itemBackgroundColorRatios":[],"rollOverItemThumbnailShadowColor":"#000000","itemLabelFontStyle":"normal","scrollBarMargin":2,"selectedItemThumbnailShadow":true,"selectedItemThumbnailShadowColor":"#00FFFF","toolTipFontFamily":"Oswald","selectedItemThumbnailShadowBlurRadius":10,"rollOverItemThumbnailShadowVerticalLength":4,"rollOverItemThumbnailShadowBlurRadius":5,"toolTipBorderSize":0,"itemThumbnailShadowOpacity":0.8,"horizontalAlign":"right","itemThumbnailShadow":false,"itemBorderRadius":0,"toolTipPaddingTop":4,"paddingTop":9,"selectedItemLabelFontWeight":"normal","class":"ThumbnailList","left":1014,"toolTipPaddingRight":6},{"id":"Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E","minWidth":1,"right":"0%","scrollBarColor":"#000000","backgroundOpacity":0,"data":{"name":"-CONFIG"},"top":"0%","width":115.05,"height":641,"layout":"absolute","scrollBarMargin":2,"gap":10,"creationPolicy":"inAdvance","class":"Container","children":["this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A","this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"],"minHeight":1},{"id":"mainPlayList","items":[{"player":"this.MainViewerPanoramaPlayer","camera":"this.panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_camera","media":"this.panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5","class":"PanoramaPlayListItem","begin":"this.setEndToItemIndex(this.mainPlayList, 0, 1)"},{"player":"this.MainViewerPanoramaPlayer","end":"this.trigger('tourEnded')","camera":"this.panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_camera","media":"this.panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD","class":"PanoramaPlayListItem","begin":"this.setEndToItemIndex(this.mainPlayList, 1, 0)"}],"class":"PlayList"},{"id":"panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD","vfov":180,"label":trans('panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD.label'),"thumbnailUrl":"media/panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_t.webp","data":{"label":"IMG_20250414_143650_00_029"},"frames":[{"thumbnailUrl":"media/panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_t.webp","cube":{"class":"ImageResource","levels":[{"height":2048,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_0/{face}/0/{row}_{column}.webp","colCount":24,"width":12288,"rowCount":4},{"height":1024,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_0/{face}/1/{row}_{column}.webp","colCount":12,"width":6144,"rowCount":2},{"height":512,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_0/{face}/2/{row}_{column}.webp","colCount":6,"width":3072,"rowCount":1}]},"class":"CubicPanoramaFrame"}],"hfovMax":130,"class":"Panorama","hfovMin":"150%","hfov":360},{"id":"MainViewerPanoramaPlayer","aaEnabled":true,"buttonToggleGyroscope":"this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A","buttonCardboardView":"this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB","viewerArea":"this.MainViewer","keepModel3DLoadedWithoutLocation":true,"class":"PanoramaPlayer","touchControlMode":"drag_rotation","displayPlaybackBar":true,"mouseControlMode":"drag_rotation","arrowKeysAction":"translate"},{"id":"IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB","minWidth":1,"toolTipPaddingLeft":6,"iconURL":"skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png","data":{"name":"IconButton VR"},"rollOverIconURL":"skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png","toolTipFontColor":"#FFFFFF","backgroundOpacity":0,"toolTipBorderColor":"#000000","toolTip":trans('IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.toolTip'),"toolTipTextShadowColor":"#000000","toolTipBackgroundColor":"#9966CC","verticalAlign":"middle","toolTipFontSize":"17px","width":58,"toolTipShadowColor":"#333333","height":58,"toolTipFontFamily":"Oswald","toolTipBorderSize":0,"transparencyActive":true,"maxHeight":58,"horizontalAlign":"center","class":"IconButton","toolTipPaddingBottom":4,"toolTipPaddingTop":4,"toolTipPaddingRight":6,"maxWidth":58,"minHeight":1},{"id":"IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96","minWidth":1,"toolTipPaddingLeft":6,"iconURL":"skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png","pressedIconURL":"skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png","data":{"name":"IconButton HS"},"toolTipFontColor":"#FFFFFF","mode":"toggle","backgroundOpacity":0,"toolTipBorderColor":"#000000","toolTip":trans('IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.toolTip'),"toolTipTextShadowColor":"#000000","toolTipBackgroundColor":"#9966CC","verticalAlign":"middle","toolTipFontSize":"17px","width":58,"toolTipShadowColor":"#333333","height":58,"toolTipFontFamily":"Oswald","toolTipBorderSize":0,"click":"this.MainViewerPanoramaPlayer.set('hotspotsEnabled', !this.MainViewerPanoramaPlayer.get('hotspotsEnabled'))","transparencyActive":true,"maxHeight":58,"horizontalAlign":"center","class":"IconButton","toolTipPaddingBottom":4,"toolTipPaddingTop":4,"toolTipPaddingRight":6,"maxWidth":58,"minHeight":1},{"id":"IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D","minWidth":1,"iconURL":"skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png","pressedIconURL":"skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png","data":{"name":"IconButton MUTE"},"mode":"toggle","backgroundOpacity":0,"transparencyActive":true,"verticalAlign":"middle","width":58,"height":58,"visible":false,"maxHeight":58,"horizontalAlign":"center","class":"IconButton","maxWidth":58,"minHeight":1},{"id":"ThumbnailList_5CC606D1_0C8A_F505_41A0_386B38F944F1_playlist","items":[{"camera":"this.panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_camera","media":"this.panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5","player":"this.MainViewerPanoramaPlayer","class":"PanoramaPlayListItem"},{"camera":"this.panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD_camera","media":"this.panorama_EFEDB6D7_FA72_54F6_41C6_8A14D24E0FBD","player":"this.MainViewerPanoramaPlayer","class":"PanoramaPlayListItem"}],"class":"PlayList"},{"id":"Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE","minWidth":1,"right":"0%","scrollBarColor":"#000000","overflow":"scroll","backgroundOpacity":0,"data":{"name":"--BOTOES"},"bottom":"0%","scrollBarMargin":2,"height":"85.179%","width":"100%","layout":"vertical","visible":false,"gap":3,"creationPolicy":"inAdvance","horizontalAlign":"center","class":"Container","children":["this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB","this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A","this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D","this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96","this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0","this.IconButton_5080D29A_43F6_AE6F_41C2_8F7019503F88"],"minHeight":1},{"id":"Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A","minWidth":1,"right":"0%","scrollBarColor":"#000000","verticalAlign":"middle","backgroundOpacity":0,"data":{"name":"--BOTAO MENU"},"top":"0%","width":115.05,"height":110,"layout":"horizontal","scrollBarMargin":2,"gap":10,"creationPolicy":"inAdvance","horizontalAlign":"center","class":"Container","children":["this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"],"minHeight":1},{"id":"IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329","minWidth":1,"iconURL":"skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png","pressedIconURL":"skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png","data":{"name":"image button menu"},"mode":"toggle","backgroundOpacity":0,"transparencyActive":true,"verticalAlign":"middle","width":60,"height":60,"click":"var visibleFunc = function(component) { this.setComponentVisibility(component, true, 0, null, 'showEffect', false)}.bind(this); var invisibleFunc = function(component) { this.setComponentVisibility(component, false, 0, null, 'hideEffect', false)}.bind(this); if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ visibleFunc(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE) } else { invisibleFunc(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE) }","maxHeight":60,"horizontalAlign":"center","class":"IconButton","maxWidth":60,"minHeight":1},{"id":"IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0","minWidth":1,"toolTipPaddingLeft":6,"iconURL":"skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png","pressedIconURL":"skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png","data":{"name":"IconButton FULLSCREEN"},"toolTipFontColor":"#FFFFFF","mode":"toggle","backgroundOpacity":0,"toolTipBorderColor":"#000000","toolTip":trans('IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.toolTip'),"toolTipTextShadowColor":"#000000","toolTipBackgroundColor":"#9966CC","verticalAlign":"middle","toolTipFontSize":"17px","width":58,"toolTipShadowColor":"#333333","height":58,"toolTipFontFamily":"Oswald","toolTipBorderSize":0,"transparencyActive":true,"maxHeight":58,"horizontalAlign":"center","class":"IconButton","toolTipPaddingBottom":4,"toolTipPaddingTop":4,"toolTipPaddingRight":6,"maxWidth":58,"minHeight":1},{"id":"IconButton_5080D29A_43F6_AE6F_41C2_8F7019503F88","minWidth":1,"backgroundColor":[],"toolTipPaddingLeft":6,"iconURL":"skin/IconButton_5080D29A_43F6_AE6F_41C2_8F7019503F88.png","data":{"name":"IconButton7388"},"toolTipFontColor":"#FFFFFF","propagateClick":false,"backgroundOpacity":0.3,"toolTipBorderColor":"#000000","toolTip":trans('IconButton_5080D29A_43F6_AE6F_41C2_8F7019503F88.toolTip'),"toolTipTextShadowColor":"#000000","toolTipBackgroundColor":"#9966CC","verticalAlign":"middle","toolTipFontSize":"17px","backgroundColorRatios":[],"width":58,"toolTipShadowColor":"#333333","height":58,"toolTipFontFamily":"Oswald","click":"this.takeScreenshot(this.MainViewer)","transparencyActive":true,"toolTipBorderSize":0,"horizontalAlign":"center","class":"IconButton","toolTipPaddingBottom":4,"toolTipPaddingTop":4,"toolTipPaddingRight":6,"minHeight":1},{"id":"panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_camera","enterPointingToHorizon":true,"initialSequence":"this.sequence_EF9C224F_FA72_AFD6_41ED_5E2905E65EAC","initialPosition":{"yaw":0,"class":"PanoramaCameraPosition","pitch":0},"class":"PanoramaCamera"},{"id":"IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A","minWidth":1,"toolTipPaddingLeft":6,"iconURL":"skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png","pressedIconURL":"skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png","data":{"name":"IconButton GYRO"},"toolTipFontColor":"#FFFFFF","backgroundOpacity":0,"toolTipBorderColor":"#000000","toolTip":trans('IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.toolTip'),"toolTipTextShadowColor":"#000000","mode":"toggle","toolTipBackgroundColor":"#9966CC","verticalAlign":"middle","toolTipFontSize":"17px","width":58,"toolTipShadowColor":"#333333","height":58,"toolTipFontFamily":"Oswald","toolTipBorderSize":0,"transparencyActive":true,"maxHeight":58,"horizontalAlign":"center","class":"IconButton","toolTipPaddingBottom":4,"toolTipPaddingTop":4,"toolTipPaddingRight":6,"maxWidth":58,"minHeight":1},{"id":"panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5","vfov":180,"label":trans('panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5.label'),"thumbnailUrl":"media/panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_t.webp","data":{"label":"IMG_20250414_143548_00_028"},"frames":[{"thumbnailUrl":"media/panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_t.webp","cube":{"class":"ImageResource","levels":[{"height":2048,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_0/{face}/0/{row}_{column}.webp","colCount":24,"width":12288,"rowCount":4},{"height":1024,"class":"TiledImageResourceLevel","tags":"ondemand","url":"media/panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_0/{face}/1/{row}_{column}.webp","colCount":12,"width":6144,"rowCount":2},{"height":512,"class":"TiledImageResourceLevel","tags":["ondemand","preload"],"url":"media/panorama_EDD079B5_FA72_7D4B_41EB_3FEF55EE8AA5_0/{face}/2/{row}_{column}.webp","colCount":6,"width":3072,"rowCount":1}]},"class":"CubicPanoramaFrame"}],"hfovMax":130,"class":"Panorama","hfovMin":"150%","hfov":360},{"id":"sequence_EF90B251_FA72_AFCA_41E2_E09D5F1344D1","movements":[{"easing":"cubic_in","yawDelta":18.5,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"yawDelta":323,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"easing":"cubic_out","yawDelta":18.5,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96}],"class":"PanoramaCameraSequence"},{"id":"sequence_EF9C224F_FA72_AFD6_41ED_5E2905E65EAC","movements":[{"easing":"cubic_in","yawDelta":18.5,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"yawDelta":323,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96},{"easing":"cubic_out","yawDelta":18.5,"class":"DistancePanoramaCameraMovement","yawSpeed":7.96}],"class":"PanoramaCameraSequence"}],"backgroundColorRatios":[0],"scrollBarMargin":2,"height":"100%","width":"100%","layout":"absolute","gap":10,"creationPolicy":"inAdvance","class":"Player","scripts":{"playAudioList":TDV.Tour.Script.playAudioList,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"historyGoForward":TDV.Tour.Script.historyGoForward,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"downloadFile":TDV.Tour.Script.downloadFile,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"getKey":TDV.Tour.Script.getKey,"showPopupImage":TDV.Tour.Script.showPopupImage,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"enableVR":TDV.Tour.Script.enableVR,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"textToSpeech":TDV.Tour.Script.textToSpeech,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"disableVR":TDV.Tour.Script.disableVR,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"executeJS":TDV.Tour.Script.executeJS,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"toggleVR":TDV.Tour.Script.toggleVR,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"init":TDV.Tour.Script.init,"translate":TDV.Tour.Script.translate,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"resumePlayers":TDV.Tour.Script.resumePlayers,"createTween":TDV.Tour.Script.createTween,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"registerKey":TDV.Tour.Script.registerKey,"unregisterKey":TDV.Tour.Script.unregisterKey,"quizShowScore":TDV.Tour.Script.quizShowScore,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"existsKey":TDV.Tour.Script.existsKey,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"getOverlays":TDV.Tour.Script.getOverlays,"initAnalytics":TDV.Tour.Script.initAnalytics,"setLocale":TDV.Tour.Script.setLocale,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"clone":TDV.Tour.Script.clone,"showWindow":TDV.Tour.Script.showWindow,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"startMeasurement":TDV.Tour.Script.startMeasurement,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"setMapLocation":TDV.Tour.Script.setMapLocation,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"isPanorama":TDV.Tour.Script.isPanorama,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"initQuiz":TDV.Tour.Script.initQuiz,"quizStart":TDV.Tour.Script.quizStart,"getComponentByName":TDV.Tour.Script.getComponentByName,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"quizFinish":TDV.Tour.Script.quizFinish,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"historyGoBack":TDV.Tour.Script.historyGoBack,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"cloneGeneric":TDV.Tour.Script.cloneGeneric,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"setValue":TDV.Tour.Script.setValue,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"cloneBindings":TDV.Tour.Script.cloneBindings,"shareSocial":TDV.Tour.Script.shareSocial,"openLink":TDV.Tour.Script.openLink,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getMainViewer":TDV.Tour.Script.getMainViewer,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"getPixels":TDV.Tour.Script.getPixels,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"getMediaByName":TDV.Tour.Script.getMediaByName,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"mixObject":TDV.Tour.Script.mixObject},"minHeight":20};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    var a = {};
    return this['get']('data')['translateObjs'] = translateObjs, a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2025.1.19, Fri Jul 11 2025