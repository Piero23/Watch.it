package org.unical.webapp.backend.persistence.dao.DaoImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.unical.webapp.backend.model.Contenuto;
import org.unical.webapp.backend.model.Utente;
import org.unical.webapp.backend.persistence.DBManager;
import org.unical.webapp.backend.persistence.dao.DaoImpl.proxy.ContenutoProxy;
import org.unical.webapp.backend.persistence.dao.UtenteDao;

import java.nio.charset.StandardCharsets;
import java.sql.*;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Component
public class ConcreteUtenteDao implements UtenteDao {

  private static final Logger log = LoggerFactory.getLogger(ConcreteUtenteDao.class);
  Connection connection;

  public ConcreteUtenteDao() {this.connection = DBManager.getInstance().getConnection();;}

  @Override
  public Utente findByusername(String username) {
    try{
      PreparedStatement query = connection.prepareStatement("select * from utente where username=?");
      query.setString(1, username);
      ResultSet rs = query.executeQuery();
      if (!rs.isBeforeFirst()) return null; //chiedere al professore se serve
      rs.next();

      Utente utente = new Utente();
      utente.setUsername(rs.getString("username"));
      utente.setPassword(rs.getString("password"));
      utente.setEmail(rs.getString("email"));
      if(rs.getBytes("img_profilo") != null){
        utente.setImg_profilo(new String(rs.getBytes("img_profilo"),StandardCharsets. UTF_8));
      }else
        utente.setImg_profilo(null);
      if(rs.getBytes("imgbackground") != null){
        utente.setImgbackground(new String(rs.getBytes("imgbackground"),StandardCharsets. UTF_8));
      }else
        utente.setImgbackground(null);

      utente.setAdmin(rs.getBoolean("admin"));
      return utente;

    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Utente> findAll() {
    List<Utente> utenti = new ArrayList<Utente>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from utente");
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Utente utente = new Utente(
          rs.getString("username"),
          rs.getString("email"),
          rs.getString("password"),
          rs.getString("img_profilo"),
          rs.getString("imgbackground"),
          rs.getBoolean("admin")
        );

        utenti.add(utente);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return utenti;
  }

  @Override
  public void save(Utente utente) {
    try{
      PreparedStatement query = connection.prepareStatement(
        "insert into utente (username, email, password, admin) values (?,?,?,?)"
      );

      query.setString(1, utente.getUsername());
      query.setString(2, utente.getEmail());
      query.setString(3, utente.getPassword());

      query.setBoolean(4, utente.isAdmin());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void delete(Utente utente) {
    try{
      PreparedStatement query = connection.prepareStatement(
        "delete from utente where username=?"
      );

      query.setString(1, utente.getUsername());
      query.executeUpdate();

    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public List<Contenuto> getContenutiByUtente(Utente utente) {
    List<Contenuto> contenuti = new ArrayList<Contenuto>();
    try {
      PreparedStatement query = connection.prepareStatement("select * from contenuto_utente join contenuto on contenuto_utente.id_contenuto=contenuto.id where utente=?");
      query.setString(1, utente.getUsername());
      ResultSet rs = query.executeQuery();
      while (rs.next()){
        Contenuto contenuto = new ContenutoProxy(
          rs.getInt("id_api"),
          rs.getBoolean("is_serie"),
          rs.getString("utente"),
          rs.getInt("num_stagione"),
          rs.getInt("num_episodio"),
          rs.getInt("status"),
          rs.getInt("valutazione"),
                null
        );

        contenuti.add(contenuto);
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return contenuti;
  }

  @Override
  public void updateProPic(Utente utente, byte[] proPic) {
    try {
      PreparedStatement query = connection.prepareStatement("update utente set img_profilo=? where username=?");
      query.setBytes(1, proPic);
      query.setString(2, utente.getUsername());
      query.executeUpdate();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void updateBgImage(Utente utente, byte[] bgImage) {
    try {
      PreparedStatement query = connection.prepareStatement("update utente set imgbackground=? where username=?");
      query.setBytes(1, bgImage);
      query.setString(2, utente.getUsername());
      query.executeUpdate();
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public boolean checkExisting(String username,String mail) {
    boolean exists = false;
    try {
      PreparedStatement query = connection.prepareStatement("select count(*) from utente where username=? OR email=?");
      query.setString(1, username);
      query.setString(2, mail);
      query.executeQuery();
      ResultSet rs = query.getResultSet();
      rs.next();
      if (rs.getInt(1) >= 1) {
        exists = true;
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return exists;
  }

  @Override
  public boolean login(String mail, String password) {
    boolean login = false;
    try {
      PreparedStatement query = connection.prepareStatement("select * from utente where email=?");
      query.setString(1, mail);
      query.executeQuery();
      ResultSet rs = query.getResultSet();
      if(!rs.isBeforeFirst()) return false;
      rs.next();

      if (mail.equals(rs.getString("email")) && password.equals(rs.getString("password"))) {
        login = true;
      }
    } catch (SQLException e) {
      throw new RuntimeException(e);
    }
    return login;
  }

  @Override
  public Utente findByEmail(String email) {
    try{
      PreparedStatement query = connection.prepareStatement("select * from utente where email=?");
      query.setString(1, email);
      ResultSet rs = query.executeQuery();
      if (!rs.isBeforeFirst()) return null; //chiedere al professore se serve
      rs.next();
      Utente utente = new Utente(
              rs.getString("username"),
              rs.getString("email"),
              rs.getString("password"),
              rs.getString("img_profilo"),
              rs.getString("imgbackground"),
              rs.getBoolean("admin")
      );

      return utente;

    } catch (SQLException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }
}
