package com.ajin.user_service.dto;

import lombok.Data;

@Data
public class Credential {
    private String type;
    private String value;
    private Boolean temporary;

}
