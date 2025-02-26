"use client";
import { useMemo, useState } from "react";
import { useTensor } from "../hooks";
import { 
    IcoFullscreen, IcoFullscreenExit,
    IcoPictureToPicture, IcoPictureToPictureExit,
    IcoTheater, IcoTheaterExit,
    IcoQuality, IcoEffect, IcoSubtitle, IcoSettings, IcoVoice, IcoSpeed,
    IcoArrowDropRight, IcoMonitor,
} from "../icons";
import { Button, DropdownMenu, DropdownMenuContent } from "./";

export const TensorRightControls = () => {
    const [dropdown, setDropdown] = useState<"quality" | "voiceover" | "subtitles" | "vfx" | "speed" | "scale" | "settings" | null>(null);
    const {
        iconSize,
        player: { track, scale, speed, voice, subtitle, trackList, voiceList, subtitleList, modes, disableControls, allowedFullscreenControls},
        mode: { handleToggleMode },
        vfx: { useMovieMode, useLightingEffect, useBlackoutEffect, useAberrationEffect, setTensorVFX },
        playback: { handleChangeQuality, handleChangeVoice, handleChangeSubtitle, handleSpeedChange, handleScaleChange },
    } = useTensor();

    const toggleDropdown = (category: typeof dropdown) => setDropdown(prev => (prev === category ? null : category));

    const fullscreenIcon = useMemo(() => (modes.isFullscreen  ? <IcoFullscreenExit size={iconSize} /> : <IcoFullscreen size={iconSize} />),[iconSize, modes.isFullscreen]);
    const theaterIcon = useMemo(() => (modes.isTheatre ? <IcoTheaterExit size={iconSize} /> : <IcoTheater size={iconSize} />),[iconSize, modes.isTheatre]);
    const miniPlayerIcon = useMemo(() => (modes.isMiniPlayer ? <IcoPictureToPictureExit size={iconSize} /> : <IcoPictureToPicture size={iconSize} />),[iconSize, modes.isMiniPlayer]);

    const dropdownItems = {
        "settings": {
            header: "Настройки",
            options: [
                { 
                    id: "quality",
                    icon: <IcoQuality size={iconSize} />,
                    label: "Качество",
                    value: track?.label || "Auto",
                    show: trackList && trackList.length > 1 ? (!disableControls.quality || (allowedFullscreenControls.quality && modes.isFullscreen)) : false
                },
                { 
                    id: "voiceover",
                    icon: <IcoVoice size={iconSize} />,
                    label: "Озвучка",
                    value: voice?.label || "из видео",
                    show: voiceList && voiceList.length > 1 ? (!disableControls.voice || (allowedFullscreenControls.voice && modes.isFullscreen)) : false
                },
                { 
                    id: "subtitles",
                    icon: <IcoSubtitle size={iconSize} />,
                    label: "Субтитры",
                    valut: subtitle?.label || "Выкл",
                    show: subtitleList && subtitleList.length > 1 ? (!disableControls.subtitle || (allowedFullscreenControls.subtitle && modes.isFullscreen)) : false
                },
                { 
                    id: "vfx",
                    icon: <IcoEffect size={iconSize} />,
                    label: "Визуальные эффекты",
                    show: disableControls.vfx ? (allowedFullscreenControls.vfx && modes.isFullscreen) : false
                },
                { 
                    id: "speed",
                    icon: <IcoSpeed size={iconSize} />,
                    label: "Скорость",
                    value: speed == 1 ? "Обычная" : speed,
                    show: true,
                },
                { 
                    id: "scale",
                    icon: <IcoMonitor size={iconSize} />,
                    label: "Масштабирование",
                    valut: scale == "auto" ? "По умолчанию" : (scale == "vertical" ? "По вертикиле" : "По горизонтале"),
                    show: true},
            ],
        },
        "quality": {
            header: "Качество",
            options: trackList?.map(item => ({label: item.label, onClick: () => handleChangeQuality(item), active: track?.source === item.source})),
        },
        "voiceover": {
            header: "Озвучка",
            options: voiceList?.map(item => ({label: item.label, onClick: () => handleChangeVoice(item), active: voice?.source === item.source})),
        },
        "subtitles": {
            header: "Субтитры",
            options: subtitleList?.map(item => ({label: item.label, onClick: () => handleChangeSubtitle(item), active: subtitle?.source === item.source})),
        },
        "vfx": {
            header: "Эффекты",
            options: [
                { label: "Освещение", onClick: () => setTensorVFX({useLightingEffect: !useLightingEffect}), active: useLightingEffect },
                { label: "Экранное каше", onClick: () => setTensorVFX({useMovieMode: !useMovieMode}), active: useMovieMode },
                { label: "Аберрация", onClick: () => setTensorVFX({useAberrationEffect: !useAberrationEffect}), active: useAberrationEffect },
                { label: "Затемнение", onClick: () => setTensorVFX({useBlackoutEffect: !useBlackoutEffect}), active: useBlackoutEffect },
            ],
        },
        "speed": {
            header: "Скорость воспроизведения",
            options: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(value => ({
                label: value.toString(), onClick: () => handleSpeedChange(value), active: speed === value
            }))
        },
        "scale": {
            header: "Масштабирование",
            options: [
                { label: "По умолчанию",  onClick: () => handleScaleChange("auto"), active: scale == "auto" },
                { label: "По вертикали",  onClick: () => handleScaleChange("vertical"), active: scale == "vertical" },
                { label: "По горизонтале",  onClick: () => handleScaleChange("horizontal"), active: scale == "horizontal" },
            ]
        },
    }

    return(
        <div className="flex items-center">
            {(dropdown && modes.isFullscreen) &&
                <DropdownMenu>
                    <DropdownMenuContent show={dropdown === "settings"}>
                        {dropdownItems.settings.options.map(option => (
                            option.show && 
                                <Button
                                    key={option.id}
                                    variant="secondary"
                                    className="justify-between"
                                    onClick={() => toggleDropdown(option.id as typeof dropdown)}
                                >
                                    <div className="flex items-center gap-3">
                                        {option.icon}
                                        <p>{option.label}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p>{option.value}</p>
                                        <IcoArrowDropRight size={24} />
                                    </div>
                                </Button>
                        ))}
                    </DropdownMenuContent>
                    <DropdownMenuContent show={dropdown === "quality"}>
                        <Button variant="secondary" className="gap-4" onClick={() => toggleDropdown("settings")}>
                            <IcoArrowDropRight className="rotate-180" size={24} />
                            <p>{dropdownItems.quality.header}</p>
                        </Button>
                        {dropdownItems.quality.options?.map((option, index) => (
                            <Button
                                key={index}
                                onClick={option.onClick}
                                label={option.label}
                                variant="secondary"
                                active={option.active}
                            />
                        ))}
                    </DropdownMenuContent>
                    <DropdownMenuContent show={dropdown === "voiceover"}>
                        <Button variant="secondary" className="gap-4" onClick={() => toggleDropdown("settings")}>
                            <IcoArrowDropRight className="rotate-180" size={24} />
                            <p>{dropdownItems.voiceover.header}</p>
                        </Button>
                        {dropdownItems.voiceover.options?.map((option, index) => (
                            <Button
                                key={index}
                                onClick={option.onClick}
                                label={option.label}
                                variant="secondary"
                                active={option.active}
                            />
                        ))}
                    </DropdownMenuContent>
                    <DropdownMenuContent show={dropdown === "subtitles"}>
                        <Button variant="secondary" className="gap-4" onClick={() => toggleDropdown("settings")}>
                            <IcoArrowDropRight className="rotate-180" size={24} />
                            <p>{dropdownItems.subtitles.header}</p>
                        </Button>
                        {dropdownItems.subtitles.options?.map((option, index) => (
                            <Button
                                key={index}
                                onClick={option.onClick}
                                label={option.label}
                                variant="secondary"
                                active={option.active}
                            />
                        ))}
                    </DropdownMenuContent>
                    <DropdownMenuContent show={dropdown === "vfx"}>
                        <Button variant="secondary" className="gap-4" onClick={() => toggleDropdown("settings")}>
                            <IcoArrowDropRight className="rotate-180" size={24} />
                            <p>{dropdownItems.vfx.header}</p>
                        </Button>
                        {dropdownItems.vfx.options?.map((option, index) => (
                            <Button
                                key={index}
                                onClick={option.onClick}
                                label={option.label}
                                variant="secondary"
                                active={option.active}
                            />
                        ))}
                    </DropdownMenuContent>
                    <DropdownMenuContent show={dropdown === "speed"}>
                        <Button variant="secondary" className="gap-4" onClick={() => toggleDropdown("settings")}>
                            <IcoArrowDropRight className="rotate-180" size={24} />
                            <p>{dropdownItems.speed.header}</p>
                        </Button>
                        {dropdownItems.speed.options?.map((option, index) => (
                            <Button
                                key={index}
                                onClick={option.onClick}
                                label={option.label}
                                variant="secondary"
                                active={option.active}
                            />
                        ))}
                    </DropdownMenuContent>
                    <DropdownMenuContent show={dropdown === "scale"}>
                        <Button variant="secondary" className="gap-4" onClick={() => toggleDropdown("settings")}>
                            <IcoArrowDropRight className="rotate-180" size={24} />
                            <p>{dropdownItems.scale.header}</p>
                        </Button>
                        {dropdownItems.scale.options?.map((option, index) => (
                            <Button
                                key={index}
                                onClick={option.onClick}
                                label={option.label}
                                variant="secondary"
                                active={option.active}
                            />
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {(!disableControls.settings || (allowedFullscreenControls.settings && modes.isFullscreen)) && <Button onClick={() => toggleDropdown(dropdown == "settings" ? null : "settings")} tooltip="настройки"><IcoSettings size={iconSize} /></Button>}
            {!disableControls.miniPlayer && <Button tooltip="мини-плеер" onClick={() => handleToggleMode("mini")}>{miniPlayerIcon}</Button>}
            {!disableControls.theatre && <Button tooltip="театральный режим" onClick={() => handleToggleMode("theater")}>{theaterIcon}</Button>}
            {!disableControls.fullscreen && <Button tooltip="полноэкранный режим" toolTipClassName="right-0" onClick={() => handleToggleMode("fullscreen")}>{fullscreenIcon}</Button>}
        </div>
    )
}