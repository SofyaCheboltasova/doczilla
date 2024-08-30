package com.doczilla.model;

import java.sql.Date;

public class Student {
    private int id;
    private String name;
    private String surname;
    private String patronomyc;
    private Date birthdate;
    private int group;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getPatronomyc() {
        return patronomyc;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public int getGroup() {
        return group;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setPatronomyc(String patronomyc) {
        this.patronomyc = patronomyc;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public void setGroup(int group) {
        this.group = group;
    }
}
