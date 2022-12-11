/*
 * This file is generated by jOOQ.
 */
package edu.uci.ics.texera.web.model.jooq.generated.tables.pojos;


import edu.uci.ics.texera.web.model.jooq.generated.enums.UserRole;
import edu.uci.ics.texera.web.model.jooq.generated.tables.interfaces.IUser;

import org.jooq.types.UInteger;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class User implements IUser {

    private static final long serialVersionUID = 1019071732;

    private String   name;
    private UInteger uid;
    private String   password;
    private String   googleId;
    private UserRole role;

    public User() {}

    public User(IUser value) {
        this.name = value.getName();
        this.uid = value.getUid();
        this.password = value.getPassword();
        this.googleId = value.getGoogleId();
        this.role = value.getRole();
    }

    public User(
        String   name,
        UInteger uid,
        String   password,
        String   googleId,
        UserRole role
    ) {
        this.name = name;
        this.uid = uid;
        this.password = password;
        this.googleId = googleId;
        this.role = role;
    }

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public UInteger getUid() {
        return this.uid;
    }

    @Override
    public void setUid(UInteger uid) {
        this.uid = uid;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getGoogleId() {
        return this.googleId;
    }

    @Override
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    @Override
    public UserRole getRole() {
        return this.role;
    }

    @Override
    public void setRole(UserRole role) {
        this.role = role;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("User (");

        sb.append(name);
        sb.append(", ").append(uid);
        sb.append(", ").append(password);
        sb.append(", ").append(googleId);
        sb.append(", ").append(role);

        sb.append(")");
        return sb.toString();
    }

    // -------------------------------------------------------------------------
    // FROM and INTO
    // -------------------------------------------------------------------------

    @Override
    public void from(IUser from) {
        setName(from.getName());
        setUid(from.getUid());
        setPassword(from.getPassword());
        setGoogleId(from.getGoogleId());
        setRole(from.getRole());
    }

    @Override
    public <E extends IUser> E into(E into) {
        into.from(this);
        return into;
    }
}
