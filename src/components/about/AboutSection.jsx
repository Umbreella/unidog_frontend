import React from 'react';
import {Container, Row} from "react-bootstrap";
import TitleSection from "../others/TitleSection";
import LargeAbout from "./LargeAbout";
import about_1 from "../../images/about_1.jpg";
import about_2 from "../../images/about_2.jpg";
import about_3 from "../../images/about_3.jpg";

const AboutSection = () => {
    const section = {
        title: "Добро пожаловать на Unicat",
        subtitle: "Современные технологии достигли такого уровня, что" +
            " реализация намеченных плановых заданий предполагает" +
            " независимые способы реализации новых принципов формирования" +
            " материально-технической и кадровой базы.",
    }

    const abouts = [
        {
            image: about_1,
            title: 'Оказывается, органический трафик станет частью наших' +
                ' традиций',
            text: 'Приятно, граждане, наблюдать, как реплицированные с' +
                ' зарубежных источников, современные исследования набирают' +
                ' популярность среди определенных слоев населения, а' +
                ' значит, должны быть объективно рассмотрены' +
                ' соответствующими инстанциями.',
        },
        {
            image: about_3,
            title: 'Нашу победу сопровождал далёкий барабанный бой',
            text: 'Внезапно, интерактивные прототипы лишь добавляют' +
                ' фракционных разногласий и подвергнуты целой серии' +
                ' независимых исследований. В своём стремлении повысить' +
                ' качество жизни, они забывают, что повышение уровня' +
                ' гражданского сознания говорит о возможностях новых' +
                ' принципов формирования материально-технической и кадровой' +
                ' базы.',
        },
        {
            image: about_2,
            title: 'Оказывается, базовый вектор развития обнадёживает',
            text: 'Ясность нашей позиции очевидна: синтетическое' +
                ' тестирование прекрасно подходит для реализации' +
                ' направлений прогрессивного развития. Равным образом,' +
                ' разбавленное изрядной долей эмпатии, рациональное' +
                ' мышление представляет собой интересный эксперимент' +
                ' проверки кластеризации усилий.',
        },
    ]

    return (
        <div className="about">
            <Container>
                <TitleSection section={section}/>
                <Row className="about_row">
                    {
                        abouts.map((value, index) =>
                            <LargeAbout key={index} data={value}/>
                        )
                    }
                </Row>
            </Container>
        </div>
    );
};

export default AboutSection;