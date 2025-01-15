package org.unical.webapp.backend.model;

import java.sql.Blob;
import java.util.Arrays;
import java.util.List;

public class Utente {

  protected String username;
  protected String email;
  protected String password;
  protected byte[] img_profilo;
  protected byte[] imgbackground;
  protected boolean admin = false;

  public Utente(String username, String email, String password, byte[] img_profilo, byte[] imgbackground, boolean admin) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.img_profilo = img_profilo;
    this.imgbackground = imgbackground;
    this.admin = admin;

  }

  public Utente() {}

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public byte[] getImg_profilo() {
    return img_profilo;
  }

  public void setImg_profilo(byte[] img_profilo) {
    this.img_profilo = img_profilo;
  }

  public byte[] getImgbackground() {
    return imgbackground;
  }

  public void setImgbackground(byte[] imgbackground) {
    this.imgbackground = imgbackground;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
}
