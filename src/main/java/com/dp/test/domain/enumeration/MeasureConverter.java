package com.dp.test.domain.enumeration;

import static com.dp.test.domain.enumeration.MeasureType.*;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class MeasureConverter implements AttributeConverter<MeasureType, String> {

    @Override
    public String convertToDatabaseColumn(MeasureType attribute) {
        switch (attribute) {
            case HEIGHT:
                return "0";
            case WIDTH:
                return "1";
            case LENGTH:
                return "2";
            case DEPTH:
                return "3";
            case OTHER:
                return "4";
            default:
                throw new IllegalArgumentException("Unknown" + attribute);
        }
    }

    @Override
    public MeasureType convertToEntityAttribute(String dbData) {
        switch (dbData) {
            case "0":
                return HEIGHT;
            case "1":
                return WIDTH;
            case "2":
                return LENGTH;
            case "3":
                return DEPTH;
            case "4":
                return OTHER;
            default:
                throw new IllegalArgumentException("Unknown" + dbData);
        }
    }
}
/*
HEIGHT,
    WIDTH,
    LENGTH,
    DEPTH,
    OTHER,
*/
